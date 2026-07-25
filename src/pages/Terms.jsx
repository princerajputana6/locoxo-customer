import React from 'react'
import Title from '../components/Title'

const Section = ({ number, title, children }) => (
  <div className='mb-8'>
    <h2 className='text-base font-bold tracking-wide mb-3 border-l-4 border-black pl-4'>
      {number}. {title}
    </h2>
    <div className='text-gray-600 leading-relaxed text-sm space-y-3 pl-4'>{children}</div>
  </div>
)

const Terms = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
      <div className='mb-10'>
        <Title text1={'TERMS &'} text2={'CONDITIONS'} />
      </div>

      <div className='max-w-4xl'>
        <div className='bg-gray-50 border border-gray-200 p-6 mb-10 text-sm text-gray-600 space-y-1'>
          <p className='font-semibold text-gray-800 text-base'>LOCOXO APPARELS</p>
          <p><span className='font-semibold'>Website:</span> www.locoxo.com</p>
          <p><span className='font-semibold'>Last Updated:</span> 19 July 2026</p>
        </div>

        <p className='text-gray-600 text-sm leading-relaxed mb-10'>
          These Terms &amp; Conditions govern your use of the LOCOXO APPARELS website and your purchase of products from us.
          By accessing our website or placing an order, you agree to be bound by these terms.
        </p>

        <Section number='1' title='Business Information'>
          <p>Business Name: LOCOXO APPARELS</p>
          <p>Registered Address: 2400/67, Friends Colony, Street No. 2, Badi Haibowal, Ludhiana, Punjab, 141001, India</p>
          <p>Region of Operation: India only. We do not offer international shipping.</p>
          <p>Contact: <a href='mailto:locoxo.support@gmail.com' className='underline hover:text-black'>locoxo.support@gmail.com</a> | WhatsApp: +91 8824589682</p>
          <p>Support Hours: Monday–Saturday, 10:00 AM – 8:00 PM IST (English &amp; Hindi)</p>
        </Section>

        <Section number='2' title='Acceptance of Terms'>
          <p>
            By using our website, creating an account, or placing an order, you confirm that you are at least 18 years old
            or are using the website under the supervision of a parent or legal guardian. If you do not agree with these
            Terms &amp; Conditions, you should not use our website or services.
          </p>
        </Section>

        <Section number='3' title='Website Use'>
          <p>You agree to use this website only for lawful purposes. You must not:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Misuse, damage, or interfere with the website.</li>
            <li>Use false, misleading, or fraudulent information.</li>
            <li>Copy, reproduce, or exploit any content, images, logos, or product descriptions without written permission.</li>
            <li>Attempt unauthorized access to our systems, customer data, or account information.</li>
          </ul>
        </Section>

        <Section number='4' title='Product Information, Pricing & Stock'>
          <p>
            We strive to display our products as accurately as possible. However, product colour, shade, texture, print,
            stitching, or appearance may vary slightly from the images shown on the website due to photography lighting,
            editing, screen resolution, display settings, and manufacturing differences.
          </p>
          <p>
            Product images are for illustrative purposes only, and accessories shown are included only if specifically
            mentioned. Such minor variations are natural and shall not be treated as defects unless the product delivered
            is damaged, defective, incorrect, or materially different from the description.
          </p>
          <p>
            Prices and stock may change without notice. Limited stock may sell out at any time. We reserve the right to
            cancel or refuse any order in case of pricing errors, stock issues, suspected fraud, or other operational concerns.
          </p>
        </Section>

        <Section number='5' title='Order Placement & Confirmation'>
          <p>
            When you place an order, you agree that all details provided are correct and complete, including name, address,
            contact number, and payment information.
          </p>
          <p>We reserve the right to:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Accept or reject any order.</li>
            <li>Cancel suspicious or fraudulent orders.</li>
            <li>Cancel orders with incomplete, incorrect, or unverified information.</li>
            <li>Request OTP confirmation or order verification where applicable.</li>
          </ul>
          <p>If the customer does not confirm the required OTP for verification, the order may be automatically cancelled.</p>
        </Section>

        <Section number='6' title='Order Cancellation Policy'>
          <h3 className='font-semibold text-gray-800'>Before Shipping</h3>
          <ul className='list-disc list-inside space-y-1'>
            <li>Orders can only be cancelled within 3 hours of placing the order through the website or WhatsApp.</li>
            <li>The Cancel Order button is available only for the first 3 hours after order placement.</li>
            <li>After 3 hours, cancellation is not allowed.</li>
            <li>If the order is not verified through the required OTP, it may be cancelled automatically.</li>
            <li>Cancellation requests will not be processed without OTP confirmation.</li>
          </ul>
          <h3 className='font-semibold text-gray-800'>After Shipping</h3>
          <ul className='list-disc list-inside space-y-1'>
            <li>If the order has already been shipped, it cannot be cancelled.</li>
            <li>Customers must wait for delivery and then request a return according to our Return &amp; Refund Policy.</li>
          </ul>
          <h3 className='font-semibold text-gray-800'>Cancellation Charges &amp; Refunds</h3>
          <ul className='list-disc list-inside space-y-1'>
            <li>No cancellation fee applies if the order is cancelled within 3 hours before shipping.</li>
            <li>If the order has already shipped and is later returned, applicable delivery charges will be deducted from the refund as per the Return &amp; Refund Policy.</li>
            <li>Refunds for cancelled orders are processed within 5 to 7 business days after cancellation is confirmed.</li>
          </ul>
          <h3 className='font-semibold text-gray-800'>Frequent Cancellations</h3>
          <p>If a customer repeatedly cancels orders, especially COD orders, LOCOXO reserves the right to restrict future orders, disable Cash on Delivery for that account, or suspend or limit the account to prevent abuse.</p>
        </Section>

        <Section number='7' title='Order Modifications'>
          <h3 className='font-semibold text-gray-800'>Before Shipping</h3>
          <p>Customers may request modification of size, color, or shipping address. Modifications are allowed only within 3 hours of placing the order through My Orders on the website.</p>
          <h3 className='font-semibold text-gray-800'>After Shipping</h3>
          <p>Address changes are not allowed after dispatch. Size exchange after delivery is allowed only as per the Exchange Policy. Color exchange is not allowed unless approved as an exception by our support team.</p>
        </Section>

        <Section number='8' title='Delivery Policy'>
          <p>
            We deliver orders only within India. Estimated delivery time is generally 5 to 10 days, depending on location,
            courier performance, weather, public holidays, and other circumstances beyond our control.
          </p>
          <p>
            Once your order is dispatched, tracking details may be shared by email, WhatsApp, or SMS. Delivery timelines
            shown at checkout are only estimates and may vary. If delivery fails multiple times due to customer unavailability,
            an incorrect address, or refusal to accept the parcel, the order may be automatically cancelled.
          </p>
        </Section>

        <Section number='9' title='Payment Terms'>
          <p>We accept the following payment methods: UPI, net banking, debit card, credit card, and cash on delivery.</p>
          <p>
            By placing an order, you authorize us and our payment partners to charge the applicable amount for the selected
            order. For COD orders, additional handling or service charges may apply as shown at checkout or in our policy.
          </p>
        </Section>

        <Section number='10' title='Returns, Refunds & Exchanges'>
          <p>Our Return, Refund &amp; Exchange Policy forms part of these Terms &amp; Conditions.</p>
          <p><span className='font-semibold'>Return Window:</span> Customers may request a return within 5 to 7 days from the date of delivery. The timeline begins from the date of delivery, not the order date.</p>
          <p><span className='font-semibold'>Eligible Items</span> must be unused, unworn, unwashed, in original packaging, with original tags attached and with invoice or order ID included.</p>
          <p><span className='font-semibold'>Non-Returnable Items:</span> innerwear and undergarments; customized or personalized products; sale, stock clearance, offer sale, and combo products; products purchased under non-returnable coupon offers, promotional offers, or BOGO deals; and any item marked as non-returnable or non-exchangeable.</p>
          <p><span className='font-semibold'>Exchange Policy:</span> Exchanges are available for size only. Orders ₹999 and above get free exchange shipping; orders below ₹999 require the customer to pay exchange shipping through the website; first-time orders get free exchange, regardless of order value.</p>
          <p><span className='font-semibold'>Damaged, Defective, or Wrong Items:</span> Report within 3 to 5 days of delivery with clear photos or video evidence. Depending on the case, we may offer a replacement, repair, or refund.</p>
          <p>Minor colour or fabric variation caused by lighting, camera, screen settings, or natural manufacturing differences is not considered a defect.</p>
        </Section>

        <Section number='11' title='Refund Processing'>
          <p>
            Once a returned product is received, inspected, and approved by our Quality Check team, refunds are processed
            within 7 to 10 business days to the original payment method or as otherwise provided during the return process.
          </p>
          <p><span className='font-semibold'>Refund Deductions:</span> First-time orders — no return handling or processing charges deducted. Subsequent orders — delivery charges may be deducted. COD orders — delivery charges and COD handling charges may be deducted. Prepaid orders — only delivery charges may be deducted.</p>
          <p>If a return is disputed, non-compliant, or requires investigation, LOCOXO reserves the right to delay, withhold, adjust, or reject the refund as permitted by applicable law.</p>
        </Section>

        <Section number='12' title='Intellectual Property'>
          <p>
            All content on this website, including the logo, brand name, product images, designs, text, graphics, layout,
            and website material, is owned by LOCOXO APPARELS or used with permission. You may not copy, reproduce, distribute,
            modify, sell, or commercially use any content from this website without our prior written consent.
          </p>
        </Section>

        <Section number='13' title='User Responsibilities'>
          <p>You are responsible for maintaining the confidentiality of your account details and for all activity under your account. You agree to:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Provide accurate and current information.</li>
            <li>Keep your login credentials secure.</li>
            <li>Review your order details before placing an order.</li>
            <li>Notify us immediately if you suspect unauthorized use of your account.</li>
          </ul>
        </Section>

        <Section number='14' title='Fraud & Abuse Prevention'>
          <p>We reserve the right to cancel suspicious or fraudulent orders without notice. This includes orders involving:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Fake or incomplete addresses</li>
            <li>Unusual ordering patterns</li>
            <li>Payment discrepancies</li>
            <li>Repeated cancellation abuse</li>
            <li>Abuse of COD or return policies</li>
          </ul>
          <p>If a customer repeatedly cancels COD orders, we may disable COD for that customer account.</p>
        </Section>

        <Section number='15' title='Limitation of Liability'>
          <p>
            To the maximum extent permitted by law, LOCOXO APPARELS shall not be liable for indirect, incidental, special,
            or consequential damages arising from the use of our website or products. Our liability, if any, shall be limited
            to the amount paid for the specific product concerned, subject to applicable law.
          </p>
        </Section>

        <Section number='16' title='Governing Law & Dispute Resolution'>
          <p>
            These Terms &amp; Conditions are governed by the laws of India. Any disputes arising out of or relating to these
            terms shall be subject to the jurisdiction of the courts in Ludhiana, Punjab, unless otherwise required by applicable law.
          </p>
        </Section>

        <Section number='17' title='Changes to Terms'>
          <p>
            We may update or revise these Terms &amp; Conditions at any time without prior notice. The updated version will
            be posted on this page with the revised date. Continued use of the website after changes means you accept the updated terms.
          </p>
        </Section>

        <Section number='18' title='Contact Us'>
          <p>If you have any questions about these Terms &amp; Conditions, please contact us:</p>
          <div className='bg-gray-50 border border-gray-200 p-4 mt-2'>
            <p>Email: <a href='mailto:locoxo.support@gmail.com' className='underline hover:text-black'>locoxo.support@gmail.com</a></p>
            <p>WhatsApp: +91 8824589682</p>
            <p>Support Hours: Monday–Saturday, 10:00 AM – 8:00 PM IST</p>
            <p>Languages: English &amp; Hindi</p>
          </div>
        </Section>
      </div>
    </div>
  )
}

export default Terms
