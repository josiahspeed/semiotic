import { Fingerprint, CreditCard, BadgeCheck, ThumbsUp, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import tileBg from "@/assets/tile-bg.png";
import tileBg2 from "@/assets/tile-bg-2.png";
import { usePartnershipModal } from "@/hooks/usePartnershipModal";

const FeaturesSection = () => {
  const { openModal } = usePartnershipModal();

  return <>
      {/* How Agentium Works Section */}
      <section id="how-it-works" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
                How Agentium Works
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6">
                Agentium gives every human, robot, and AI agent a verifiable digital identity (DID) and the credentials they need to operate with trust. We capture proof of each action, standardize evaluation, automate settlement, and update portable reputation—so you can launch secure, auditable workflows without building identity, credentialing, verification, or payment systems yourself.
              </p>
              <Button 
                size="lg" 
                onClick={openModal}
                className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 h-auto group bg-gradient-to-r from-cta-gradient-from to-cta-gradient-to hover:from-cta-gradient-from-hover hover:to-cta-gradient-to-hover transition-all w-full sm:w-auto"
              >
                Partner With Us
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  icon: Fingerprint,
                  title: "Identity",
                  description: "Unique, verifiable agent identifiers (for humans, AIs, and devices)."
                },
                {
                  icon: CreditCard,
                  title: "Payments",
                  description: "Orchestration of escrow, multi-party settlements."
                },
                {
                  icon: BadgeCheck,
                  title: "Verification",
                  description: "Cryptographic proof and validation of actions."
                },
                {
                  icon: ThumbsUp,
                  title: "Reputation",
                  description: "Event-driven scoring and performance tracking."
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return <Card key={index} className="relative overflow-hidden p-0 hover:shadow-lg transition-shadow bg-gradient-to-br from-white via-white to-purple-50/30 border-border">
                  {/* Vertical teal bar with rotated text */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-primary flex items-center justify-center">
                    <span className="text-white font-semibold text-sm tracking-wider whitespace-nowrap origin-center -rotate-90">
                      {feature.title}
                    </span>
                  </div>
                  
                  {/* Card content */}
                  <div className="pl-16 pr-6 py-6 flex flex-col items-start text-left">
                    <div className="mb-4">
                      <Icon className="w-12 h-12 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </Card>;
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-12 md:py-24" style={{
      backgroundImage: 'url(/images/lifecycle-background.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
        <div className="container mx-auto px-4 md:px-6">
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-16 text-center">
            The Agent Lifecycle
          </h2>

          {/* Mobile View */}
          <div className="lg:hidden space-y-4">
            <Card className="p-4 md:p-6 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 bg-feature-card-dark">
              <div className="text-sm font-semibold mb-2 text-feature-accent">01</div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Identity</h3>
              <p className="text-sm md:text-base text-white/80">
                Every workflow begins with a verifiable digital identity (DID) and credentials for humans, robots, and AI agents.
              </p>
            </Card>

            <Card className="p-4 md:p-6 bg-white/5 backdrop-blur-lg border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/10">
              <div className="text-sm font-semibold mb-2 text-feature-accent">02</div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Intent</h3>
              <p className="text-sm md:text-base text-white/80">
                The agent expresses what it wants to accomplish - a task, request, or objective anchored to a trusted identity.
              </p>
            </Card>

            <div className="p-4 md:p-6 bg-white/5 rounded-lg">
              <p className="text-sm md:text-base text-white/80">
                Agentium coordinates autonomous agents through identity, payments, verification, and reputation primitives.
              </p>
            </div>

            <Card className="p-4 md:p-6 bg-white border-border transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30">
              <div className="text-sm font-semibold mb-2 text-feature-accent">03</div>
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-3">Matching</h3>
              <p className="text-sm md:text-base text-black">
                Systems, hubs, or applications match the intent to the right agent, provider, or resource.
              </p>
            </Card>

            <div className="p-4 md:p-6 bg-white/5 rounded-lg">
              <p className="text-sm md:text-base text-white/80">
                Agentium enables autonomous coordination between agents across any market or vertical.
              </p>
            </div>

            <Card className="p-4 md:p-6 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20" style={{ 
              backgroundImage: `url(${tileBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div className="text-sm font-semibold mb-2 text-feature-accent">04</div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Fulfillment</h3>
              <p className="text-sm md:text-base text-white/80">
                The selected agent performs the required action, demonstration, or task.
              </p>
            </Card>

            <Card className="p-4 md:p-6 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20" style={{ 
              backgroundImage: `url(${tileBg2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div className="text-sm font-semibold mb-2 text-feature-accent">05</div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Provenance & Verification</h3>
              <p className="text-sm md:text-base text-white/80">
                Agentium captures signed evidence of what happened and evaluates the outcome through trusted evaluators.
              </p>
            </Card>

            <Card className="p-4 md:p-6 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 bg-feature-card-dark">
              <div className="text-sm font-semibold mb-2 text-feature-accent">06</div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Settlement & Reputation</h3>
              <p className="text-sm md:text-base text-white/80">
                Payments are released based on verified results, and reputation is updated across ecosystems.
              </p>
            </Card>
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block space-y-6">
            {/* Row 1 */}
            <div className="flex gap-6">
              <Card className="p-6 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 bg-feature-card-dark" style={{ width: '37%' }}>
                <div className="text-sm font-semibold mb-2 text-feature-accent">01</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Identity
                </h3>
                <p className="text-white/80">
                  Every workflow begins with a verifiable digital identity (DID) and credentials for humans, robots, and AI agents.
                </p>
              </Card>

              <Card className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/10" style={{ width: '37%' }}>
                <div className="text-sm font-semibold mb-2 text-feature-accent">02</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Intent
                </h3>
                <p className="text-white/80">
                  The agent expresses what it wants to accomplish - a task, request, or objective anchored to a trusted identity.
                </p>
              </Card>

              <div className="p-6 transition-all duration-300 hover:translate-x-2" style={{ width: '24%' }}>
                <p className="text-white/80">
                  Agentium coordinates autonomous agents through identity, payments, verification, and reputation primitives.
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-6">
              <Card className="p-6 bg-white border-border transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30" style={{ width: '24%' }}>
                <div className="text-sm font-semibold mb-2 text-feature-accent">03</div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  Matching
                </h3>
                <p className="text-black">
                  Systems, hubs, or applications match the intent to the right agent, provider, or resource.
                </p>
              </Card>

              <div className="p-6 transition-all duration-300 hover:translate-x-2" style={{ width: '24%' }}>
                <p className="text-white/80">
                  Agentium enables autonomous coordination between agents across any market or vertical.
                </p>
              </div>

              <Card className="p-6 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20" style={{ 
                width: '50%',
                backgroundImage: `url(${tileBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
                <div className="text-sm font-semibold mb-2 text-feature-accent">04</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Fulfillment
                </h3>
                <p className="text-white/80">
                  The selected agent performs the required action, demonstration, or task.
                </p>
              </Card>
            </div>

            {/* Row 3 */}
            <div className="flex gap-6">
              <div style={{ width: '24%' }}></div>

              <Card className="p-6 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20" style={{ 
                width: '37%',
                backgroundImage: `url(${tileBg2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
                <div className="text-sm font-semibold mb-2 text-feature-accent">05</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Provenance & Verification
                </h3>
                <p className="text-white/80">
                  Agentium captures signed evidence of what happened and evaluates the outcome through trusted evaluators.
                </p>
              </Card>

              <Card className="p-6 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 bg-feature-card-dark" style={{ width: '37%' }}>
                <div className="text-sm font-semibold mb-2 text-feature-accent">06</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Settlement & Reputation
                </h3>
                <p className="text-white/80">
                  Payments are released based on verified results, and reputation is updated across ecosystems.
                </p>
              </Card>
            </div>
          </div>

          <div className="flex justify-center mt-8 md:mt-12 px-4">
            <Button 
              size="lg" 
              onClick={openModal}
              className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 h-auto group bg-white text-primary hover:bg-white/90 transition-all w-full sm:w-auto"
            >
              Partner With Us
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </>;
};
export default FeaturesSection;
