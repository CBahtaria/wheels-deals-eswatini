import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-16 px-4 md:px-6 min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>Legal</p>
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text)' }}>Privacy Policy</h1>
          <p className="text-sm mb-10" style={{ color: 'var(--text-subtle)' }}>Last updated: July 2025</p>

          <div className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>

            <Section title="1. Who We Are">
              Wheels &amp; Deals Eswatini is a used vehicle dealership operating from Matsapha, M200, Eswatini. We operate this website and communicate with customers via WhatsApp, phone, and Facebook. References to &quot;we&quot;, &quot;us&quot;, or &quot;our&quot; mean Wheels &amp; Deals Eswatini.
            </Section>

            <Section title="2. Information We Collect">
              <p>When you interact with us, we may collect:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong style={{ color: 'var(--text)' }}>Contact details:</strong> name, phone number, WhatsApp number, email address.</li>
                <li><strong style={{ color: 'var(--text)' }}>Vehicle enquiry information:</strong> the vehicle(s) you are interested in, your budget, trade-in details.</li>
                <li><strong style={{ color: 'var(--text)' }}>Sell enquiry information:</strong> vehicle make, model, year, mileage, condition, your asking price.</li>
                <li><strong style={{ color: 'var(--text)' }}>Finance details:</strong> income, employment status, deposit amount — only if you apply for finance assistance.</li>
                <li><strong style={{ color: 'var(--text)' }}>Website usage data:</strong> pages visited, browser type, device type — collected anonymously via standard web analytics.</li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Information">
              <ul className="list-disc pl-5 space-y-1">
                <li>To respond to your vehicle or service enquiry.</li>
                <li>To facilitate finance introductions to our lending partners (only with your consent).</li>
                <li>To process vehicle purchase or sale transactions.</li>
                <li>To contact you about vehicles matching your stated requirements (only if you have asked us to).</li>
                <li>To improve our website and services.</li>
              </ul>
              <p className="mt-2">We do not use your information for automated marketing without your explicit consent.</p>
            </Section>

            <Section title="4. How We Share Your Information">
              <p>We share your information only:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>With finance partners, when you request finance assistance and consent to sharing.</li>
                <li>With relevant government bodies (e.g. Eswatini Roads Authority) to process vehicle registration transfers.</li>
                <li>When required to do so by Eswatini law.</li>
              </ul>
              <p className="mt-2">We do not sell or rent your personal information to any third party.</p>
            </Section>

            <Section title="5. WhatsApp &amp; Social Media">
              When you contact us via WhatsApp or Facebook Messenger, those messages are stored within those platforms and subject to their respective privacy policies. We use the information only to respond to your enquiry.
            </Section>

            <Section title="6. AI Chat Assistant (Thandi)">
              Our website includes an AI-powered chat assistant called Thandi. Conversations with Thandi are processed by Anthropic&apos;s Claude API. Messages are not stored by us after the session ends. Do not share sensitive personal or financial details through the chat widget — use WhatsApp or call us directly for sensitive discussions.
            </Section>

            <Section title="7. Data Retention">
              We retain your contact and transaction information for as long as necessary to fulfil the purpose it was collected for, and as required by Eswatini financial and tax regulations (typically 5–7 years for transaction records).
            </Section>

            <Section title="8. Your Rights">
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Request access to the personal information we hold about you.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Request deletion of your information, subject to any legal retention obligations.</li>
                <li>Withdraw consent for marketing contact at any time.</li>
              </ul>
              <p className="mt-2">To exercise any of these rights, contact us via WhatsApp or phone.</p>
            </Section>

            <Section title="9. Security">
              We take reasonable precautions to protect your personal information from unauthorised access or disclosure. However, no internet transmission is fully secure and we cannot guarantee absolute security.
            </Section>

            <Section title="10. Changes to This Policy">
              We may update this policy from time to time. The current version is always published on this page with the effective date shown at the top.
            </Section>

            <Section title="11. Contact">
              <p>For privacy-related queries:</p>
              <p className="mt-2">WhatsApp: <a href="https://wa.me/26879106129" className="underline" style={{ color: 'var(--gold)' }}>+268 7910 6129</a></p>
              <p>Phone: <a href="tel:+26879702853" className="underline" style={{ color: 'var(--gold)' }}>+268 7970 2853</a></p>
              <p>Location: Matsapha, M200, Eswatini</p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-semibold mb-3 pb-2" style={{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </section>
  )
}
