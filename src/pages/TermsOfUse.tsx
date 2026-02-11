import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 md:pt-32 pb-8 md:pb-12">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Card className="p-5 sm:p-6 md:p-8 lg:p-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Terms of Use</h1>
            <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-8">Last updated: January 2025</p>

            <div className="prose prose-slate max-w-none space-y-5 md:space-y-6 text-sm md:text-base">
              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using Agentium's platform and services ("Services"), you agree to be bound by these Terms of Use. 
                  If you do not agree to these terms, please do not use our Services.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">2. Description of Services</h2>
                <p>
                  Agentium provides an operating system for agentic commerce, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-2 md:ml-4">
                  <li>Decentralized identity (DID) and credential management</li>
                  <li>Payment orchestration and escrow services</li>
                  <li>Action verification and cryptographic proof systems</li>
                  <li>Cross-ecosystem reputation management</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">3. User Accounts and Responsibilities</h2>
                <p>
                  To use certain features of our Services, you may need to create an account. You are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-2 md:ml-4">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Ensuring all information provided is accurate and up-to-date</li>
                  <li>Complying with all applicable laws and regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">4. Agent Identity and Credentials</h2>
                <p>
                  When creating agent identities through our platform, you certify that:
                </p>
                <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-2 md:ml-4">
                  <li>You have the authority to create and manage such identities</li>
                  <li>The agents will operate within legal and ethical boundaries</li>
                  <li>You will not use identities for fraudulent or malicious purposes</li>
                  <li>You understand that identities are cryptographically verifiable and permanent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">5. Payment Terms</h2>
                <p>
                  When using our payment and escrow services:
                </p>
                <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-2 md:ml-4">
                  <li>All transactions are subject to verification conditions you establish</li>
                  <li>Payments released from escrow are final and non-reversible</li>
                  <li>You are responsible for any fees, taxes, or charges associated with transactions</li>
                  <li>We reserve the right to suspend transactions that appear fraudulent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">6. Verification and Reputation</h2>
                <p>
                  Our verification and reputation systems operate on cryptographic proofs. While we strive for accuracy:
                </p>
                <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-2 md:ml-4">
                  <li>We do not guarantee the accuracy of all verifications</li>
                  <li>Reputation scores are generated algorithmically and may not reflect all factors</li>
                  <li>You should conduct your own due diligence before engaging with other agents</li>
                  <li>Disputes regarding verification should be addressed through our support channels</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">7. Intellectual Property</h2>
                <p>
                  All intellectual property rights in the Services remain with Agentium and its licensors. You may not:
                </p>
                <ul className="list-disc list-inside space-y-1.5 md:space-y-2 ml-2 md:ml-4">
                  <li>Copy, modify, or reverse engineer our Services</li>
                  <li>Remove or alter any proprietary notices</li>
                  <li>Use our trademarks without written permission</li>
                  <li>Create derivative works based on our Services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">8. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Agentium shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages arising from your use of the Services.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">9. Termination</h2>
                <p>
                  We reserve the right to suspend or terminate your access to the Services at any time, with or without cause, 
                  with or without notice. Upon termination, your right to use the Services will immediately cease.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">10. Changes to Terms</h2>
                <p>
                  We may modify these Terms of Use at any time. Continued use of the Services after changes constitutes 
                  acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">11. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which 
                  Agentium operates, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">12. Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Use, please contact us at:
                </p>
                <p className="mt-2">
                  <strong>Email:</strong> legal@agentium.com<br />
                  <strong>Address:</strong> [Company Address]
                </p>
              </section>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfUse;
