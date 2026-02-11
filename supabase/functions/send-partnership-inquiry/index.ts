import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PartnershipInquiry {
  companyName: string;
  contactName: string;
  email: string;
  goals: string;
  honeypot?: string; // Hidden field to catch bots
}

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }
  
  record.count++;
  return false;
}

// HTML escape function to prevent injection attacks
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Input validation with length limits
function validateAndSanitize(inquiry: PartnershipInquiry): { valid: boolean; error?: string } {
  // Check honeypot - should be empty
  if (inquiry.honeypot && inquiry.honeypot.trim() !== '') {
    return { valid: false, error: "Invalid submission" };
  }

  // Required field checks with length limits
  if (!inquiry.companyName || inquiry.companyName.trim() === '') {
    return { valid: false, error: "Company name is required" };
  }
  if (inquiry.companyName.length > 200) {
    return { valid: false, error: "Company name is too long" };
  }

  if (!inquiry.contactName || inquiry.contactName.trim() === '') {
    return { valid: false, error: "Contact name is required" };
  }
  if (inquiry.contactName.length > 200) {
    return { valid: false, error: "Contact name is too long" };
  }

  if (!inquiry.email || inquiry.email.trim() === '') {
    return { valid: false, error: "Email is required" };
  }
  if (inquiry.email.length > 320) {
    return { valid: false, error: "Email is too long" };
  }
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(inquiry.email)) {
    return { valid: false, error: "Invalid email format" };
  }

  if (!inquiry.goals || inquiry.goals.trim() === '') {
    return { valid: false, error: "Goals are required" };
  }
  if (inquiry.goals.length > 5000) {
    return { valid: false, error: "Goals description is too long" };
  }

  return { valid: true };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting based on client IP
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";
    
    if (isRateLimited(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const inquiry: PartnershipInquiry = await req.json();
    
    console.log("Received partnership inquiry from:", inquiry.email);

    // Validate and sanitize input
    const validation = validateAndSanitize(inquiry);
    if (!validation.valid) {
      console.error("Validation failed:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Escape all user input for HTML email
    const safeCompanyName = escapeHtml(inquiry.companyName.trim());
    const safeContactName = escapeHtml(inquiry.contactName.trim());
    const safeEmail = escapeHtml(inquiry.email.trim());
    const safeGoals = escapeHtml(inquiry.goals.trim());

    // Send email using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Agentium <contact@agentium.network>",
        to: ["josiahspeed@gmail.com"],
        subject: `New Partnership Inquiry from ${safeCompanyName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #015C50; border-bottom: 2px solid #23A797; padding-bottom: 10px;">
              New Partnership Inquiry
            </h1>
            
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h2 style="color: #333; margin-top: 0;">Company Information</h2>
              <p><strong>Company Name:</strong> ${safeCompanyName}</p>
              <p><strong>Contact Name:</strong> ${safeContactName}</p>
              <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            </div>
            
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h2 style="color: #333; margin-top: 0;">Goals & Use Case</h2>
              <p style="white-space: pre-wrap;">${safeGoals}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
              <p>This inquiry was submitted through the Agentium website partnership form.</p>
              <p>Submitted at: ${new Date().toISOString()}</p>
            </div>
          </div>
        `,
      }),
    });

    const emailData = await emailResponse.json();
    
    if (!emailResponse.ok) {
      console.error("Resend API error:", emailData);
      // Return generic error to client, detailed error logged server-side
      throw new Error("Failed to send inquiry");
    }

    console.log("Email sent successfully:", emailData.id);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-partnership-inquiry function:", error);
    // Return generic error message to prevent information leakage
    return new Response(
      JSON.stringify({ error: "Failed to submit inquiry. Please try again later." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
