import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata = { title: 'Terms & Conditions' }

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-16 px-4 md:px-6 min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>Legal</p>
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text)' }}>Terms &amp; Conditions</h1>
          <p className="text-sm mb-10" style={{ color: 'var(--text-subtle)' }}>Last updated: July 2025</p>

          <div className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>

            <Section title="1. Acceptance of Terms">
              By accessing or using the Wheels &amp; Deals Eswatini website, contacting us via WhatsApp or phone, or visiting our showroom, you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use our services.
            </Section>

            <Section title="2. Vehicle Listings &amp; Descriptions">
              <p>All vehicle listings on this website are for informational purposes only. We make every effort to ensure accuracy, but:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Prices are subject to change without notice.</li>
                <li>Availability is subject to prior sale. We are not liable if a vehicle is sold before you complete your purchase.</li>
                <li>Photographs may not exactly represent the current condition of the vehicle — please inspect in person before purchase.</li>
                <li>Mileage readings are taken at the time of listing and may have increased.</li>
              </ul>
            </Section>

            <Section title="3. No Reservation Without Deposit">
              A vehicle is not reserved or held for any buyer until a written deposit agreement is in place and a deposit has been received. Verbal commitments or WhatsApp messages do not constitute a reservation.
            </Section>

            <Section title="4. Vehicle Condition &amp; Inspection">
              <p>All vehicles are sold in &quot;as inspected&quot; condition. We strongly recommend:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Conducting a physical inspection before purchase.</li>
                <li>Arranging an independent mechanical inspection at your cost.</li>
                <li>Taking a test drive before committing.</li>
              </ul>
              <p className="mt-2">Wheels &amp; Deals Eswatini provides no warranty on pre-owned vehicles unless explicitly stated in writing in the sale agreement.</p>
            </Section>

            <Section title="5. Finance">
              The finance calculator on this website provides estimates only. Actual monthly payments, interest rates, and loan terms depend on the lending institution&apos;s credit assessment. We facilitate introductions to finance partners but are not a registered credit provider. Finance approval is not guaranteed.
            </Section>

            <Section title="6. Services: Delivery, In-Store &amp; Pickup">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong style={{ color: 'var(--text)' }}>Delivery:</strong> Delivery is arranged case-by-case and may attract an additional fee. Risk of damage during delivery passes to the buyer once the vehicle is loaded for transport.</li>
                <li><strong style={{ color: 'var(--text)' }}>In-store:</strong> We welcome walk-in customers during trading hours (Mon–Fri 08:00–17:00, Sat 08:00–13:00). WhatsApp ahead to confirm availability.</li>
                <li><strong style={{ color: 'var(--text)' }}>Pickup In-store:</strong> Remote purchases must be settled in full before the vehicle is released for collection.</li>
              </ul>
            </Section>

            <Section title="7. Payment">
              <ul className="list-disc pl-5 space-y-1">
                <li>We accept EFT (bank transfer), cash, and approved finance payments.</li>
                <li>We do not accept personal cheques.</li>
                <li>Full payment must clear before vehicle registration transfer is processed.</li>
              </ul>
            </Section>

            <Section title="8. Returns &amp; Cancellations">
              <p>Due to the nature of used vehicle sales, we do not accept returns once a sale is completed and the vehicle has been collected. Deposits are non-refundable if the buyer withdraws from the sale.</p>
              <p className="mt-2">If we are unable to deliver a vehicle in the agreed condition, any deposit paid will be refunded in full.</p>
            </Section>

            <Section title="9. Selling Your Vehicle to Us">
              Valuations provided during our vehicle buying process are estimates and not binding offers. A formal written offer will be made after physical inspection. We reserve the right to adjust or withdraw offers based on inspection findings.
            </Section>

            <Section title="10. Limitation of Liability">
              To the fullest extent permitted by Eswatini law, Wheels &amp; Deals Eswatini shall not be liable for any indirect, incidental, or consequential losses arising from the use of our website, vehicles, or services.
            </Section>

            <Section title="11. Governing Law">
              These terms are governed by the laws of the Kingdom of Eswatini. Any disputes shall be subject to the jurisdiction of the courts of Eswatini.
            </Section>

            <Section title="12. Contact">
              <p>For questions regarding these terms:</p>
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
