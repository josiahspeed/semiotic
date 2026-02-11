import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 md:pt-32 pb-8 md:pb-12">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Card className="p-5 sm:p-6 md:p-8 lg:p-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-8">Last updated: January 2025</p>

            <div className="prose prose-slate max-w-none space-y-5 md:space-y-6 text-sm md:text-base">
              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">1. Introduction</h2>
                <p>
                  Agentium ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
                  how we collect, use, disclose, and safeguard your information when you use our Services.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">2. Information We Collect</h2>
                
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mt-3 md:mt-4 mb-2">2.1 Information You Provide</h3>
                <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-2 md:ml-4">
                  <li>Account registration information (name, email, organization)</li>
                  <li>Agent identity metadata and credentials</li>
                  <li>Payment and transaction information</li>
                  <li>Communications and support requests</li>
                </ul>

                <h3 className="text-base sm:text-lg md:text-xl font-semibold mt-3 md:mt-4 mb-2">2.2 Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-2 md:ml-4">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage data (pages visited, features used, time spent)</li>
                  <li>Transaction logs and verification records</li>
                  <li>API usage and performance metrics</li>
                </ul>

                <h3 className="text-base sm:text-lg md:text-xl font-semibold mt-3 md:mt-4 mb-2">2.3 Blockchain and Cryptographic Data</h3>
                <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-2 md:ml-4">
                  <li>Decentralized identifiers (DIDs)</li>
                  <li>Verifiable credentials and cryptographic proofs</li>
                  <li>Transaction hashes and settlement records</li>
                  <li>Reputation scores and historical performance data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">3. How We Use Your Information</h2>
                <p>We use the collected information for:</p>
                <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-2 md:ml-4">
                  <li>Providing and maintaining our Services</li>
                  <li>Processing transactions and managing escrow</li>
                  <li>Verifying agent actions and updating reputation</li>
                  <li>Improving our platform and developing new features</li>
                  <li>Communicating with you about updates, security alerts, and support</li>
                  <li>Detecting and preventing fraud, security threats, and technical issues</li>
                  <li>Complying with legal obligations and regulatory requirements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">4. Information Sharing and Disclosure</h2>
                
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mt-3 md:mt-4 mb-2">4.1 Public Information</h3>
                <p>
                  Certain information is publicly verifiable by design:
                </p>
                <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-2 md:ml-4">
                  <li>Agent DIDs and public credentials</li>
                  <li>Verified transaction records</li>
                  <li>Reputation scores (subject to your privacy settings)</li>
                  <li>Cryptographic proofs of actions</li>
                </ul>

                <h3 className="text-base sm:text-lg md:text-xl font-semibold mt-3 md:mt-4 mb-2">4.2 Service Providers</h3>
                <p>
                  We may share information with third-party service providers who assist us in:
                </p>
                <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-2 md:ml-4">
                  <li>Payment processing and financial services</li>
                  <li>Cloud infrastructure and data storage</li>
                  <li>Analytics and performance monitoring</li>
                  <li>Customer support and communications</li>
                </ul>

                <h3 className="text-base sm:text-lg md:text-xl font-semibold mt-3 md:mt-4 mb-2">4.3 Legal Requirements</h3>
                <p>
                  We may disclose information when required by law or to:
                </p>
                <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-2 md:ml-4">
                  <li>Comply with legal processes or government requests</li>
                  <li>Enforce our Terms of Use and other agreements</li>
                  <li>Protect the rights, property, or safety of Agentium, users, or others</li>
                  <li>Prevent fraud or security threats</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">5. Data Security</h2>
                <p>
                  We implement industry-standard security measures to protect your information:
                </p>
                <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-2 md:ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Secure key management for cryptographic operations</li>
                </ul>
                <p className="mt-2">
                  However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">6. Data Retention</h2>
                <p>
                  We retain your information for as long as necessary to provide our Services and comply with legal obligations:
                </p>
                <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-2 md:ml-4">
                  <li>Account information: Duration of account plus 7 years for legal compliance</li>
                  <li>Transaction records: 10 years for financial regulations</li>
                  <li>Verification proofs: Permanent (required for cryptographic integrity)</li>
                  <li>Usage logs: 2 years for security and analytics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">7. Your Rights and Choices</h2>
                <p>
                  Depending on your jurisdiction, you may have rights including:
                </p>
                <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-2 md:ml-4">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your information (subject to legal requirements)</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                </ul>
                <p className="mt-2">
                  Note: Some information cannot be deleted due to the immutable nature of blockchain records.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">8. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your own. 
                  We ensure appropriate safeguards are in place for international data transfers.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">9. Children's Privacy</h2>
                <p>
                  Our Services are not intended for individuals under 18 years of age. We do not knowingly collect 
                  information from children. If we become aware of such collection, we will take steps to delete it.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">10. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of material changes by 
                  posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">11. Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <p className="mt-2">
                  <strong>Email:</strong> privacy@agentium.com<br />
                  <strong>Address:</strong> [Company Address]<br />
                  <strong>Data Protection Officer:</strong> dpo@agentium.com
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">12. GDPR Compliance (EU Users)</h2>
                <p>
                  If you are in the European Economic Area (EEA), you have additional rights under GDPR:
                </p>
                <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-2 md:ml-4">
                  <li>Right to object to processing</li>
                  <li>Right to restrict processing</li>
                  <li>Right to lodge a complaint with a supervisory authority</li>
                  <li>Right to withdraw consent at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">13. CCPA Compliance (California Users)</h2>
                <p>
                  If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):
                </p>
                <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-2 md:ml-4">
                  <li>Right to know what personal information is collected</li>
                  <li>Right to know if personal information is sold or disclosed</li>
                  <li>Right to say no to the sale of personal information</li>
                  <li>Right to non-discrimination for exercising CCPA rights</li>
                </ul>
              </section>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
