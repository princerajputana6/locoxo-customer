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

const GrievancePolicy = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
      <div className='mb-10'>
        <Title text1={'GRIEVANCE'} text2={'POLICY'} />
      </div>

      <div className='max-w-4xl'>
        <div className='bg-gray-50 border border-gray-200 p-6 mb-10 text-sm text-gray-600 space-y-1'>
          <p className='font-semibold text-gray-800 text-base'>Grievance Policy – LOCOXO</p>
          <p><span className='font-semibold'>Last updated:</span> 17 July 2026</p>
          <p><span className='font-semibold'>Effective date:</span> 17 July 2026</p>
        </div>

        <p className='text-gray-600 text-sm leading-relaxed mb-4'>
          This Grievance Policy explains how LOCOXO, operated by LOCOXO APPARELS ("we", "us", "our"), handles complaints,
          concerns, and disputes raised by customers using our website www.locoxo.com (the "Site").
        </p>
        <p className='text-gray-600 text-sm leading-relaxed mb-10'>
          This policy is prepared in accordance with applicable Indian laws, including the Consumer Protection Act, 2019 and
          the Consumer Protection (E-Commerce) Rules, 2020. It should be read together with our Privacy Policy, Cookies Policy,
          Terms of Use, Return &amp; Refund Policy, and Shipping Policy.
        </p>

        <Section number='1' title='Scope of This Policy'>
          <p>This Grievance Policy applies to all users, visitors, and customers of www.locoxo.com who purchase products from LOCOXO, create an account on the Site, or use any feature or service offered on the Site.</p>
          <p>It covers complaints related to:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Orders and delivery (late delivery, wrong item, missing items, damaged goods)</li>
            <li>Product quality (defects, issues beyond normal colour/size variation as per our Product Colour Disclaimer)</li>
            <li>Refunds and returns (delay, rejection, partial refund, condition of returned items)</li>
            <li>Payments (failed transactions, double charges, refund delays, payment gateway issues)</li>
            <li>Account issues (login problems, unauthorized access, account closure requests)</li>
            <li>Website issues (pricing errors, coupon/promo code issues, technical bugs)</li>
            <li>Privacy and data (unwanted messages, data access/deletion requests, consent withdrawal)</li>
            <li>Advertising and product listings (misleading descriptions, incorrect prices displayed)</li>
          </ul>
        </Section>

        <Section number='2' title='How to Raise a Grievance'>
          <p>You can raise a grievance with us through the following channels:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Email: <a href='mailto:locoxo.support@gmail.com' className='underline hover:text-black'>locoxo.support@gmail.com</a></li>
            <li>Phone / WhatsApp: +91 88245 89682 (Available Monday to Saturday, 10:00 AM to 8:00 PM IST; Sunday closed)</li>
            <li>Contact form on the Site</li>
          </ul>
          <p>When raising a grievance, please provide your full name, registered email address and mobile number, Order ID (if applicable), a clear description of the issue, and any supporting documents or screenshots (e.g., payment receipt, product photos, chat screenshots). Providing complete information helps us resolve your issue faster.</p>
        </Section>

        <Section number='3' title='Grievance Officer'>
          <p>In compliance with the Consumer Protection (E-Commerce) Rules, 2020 and other applicable laws, LOCOXO has appointed a Grievance Officer to handle customer complaints.</p>
          <div className='bg-gray-50 border border-gray-200 p-4'>
            <p className='font-semibold text-gray-800'>Grievance Officer Details</p>
            <p>Name: Support Team, LOCOXO APPARELS</p>
            <p>Designation: Grievance Officer</p>
            <p>Email: <a href='mailto:locoxo.support@gmail.com' className='underline hover:text-black'>locoxo.support@gmail.com</a></p>
            <p>Phone / WhatsApp: +91 88245 89682 (Monday to Saturday, 10:00 AM to 8:00 PM IST; Sunday closed)</p>
            <p>Address: 2400/67, Friends Colony, Street No. 2, Badi Haibowal, Ludhiana, Punjab – 141001, India</p>
          </div>
        </Section>

        <Section number='4' title='Acknowledgement and Resolution Timelines'>
          <h3 className='font-semibold text-gray-800'>4.1 Acknowledgement</h3>
          <p>We will acknowledge receipt of your grievance within 24–48 hours on business days (Monday to Saturday, excluding public holidays), via email, SMS, or WhatsApp, depending on the channel you used.</p>
          <h3 className='font-semibold text-gray-800'>4.2 Resolution</h3>
          <p>We aim to resolve most standard grievances within 7–10 days from the date of acknowledgement. For more complex issues (e.g., those requiring investigation with logistics partners, payment gateways, or vendors), resolution may take up to 15 days. If additional time is required, we will inform you of the reason and the expected timeline.</p>
          <h3 className='font-semibold text-gray-800'>4.3 Status Updates</h3>
          <p>You may request a status update at any time by emailing locoxo.support@gmail.com with your Order ID and grievance reference (if any). Where feasible, we will provide periodic updates until the issue is resolved.</p>
        </Section>

        <Section number='5' title='How We Handle Different Types of Grievances'>
          <p>While each case is handled individually, the following general approach applies:</p>
          <ul className='list-disc list-inside space-y-2'>
            <li><span className='font-semibold'>Order and Delivery Issues:</span> We verify order details, tracking information, and delivery status with our logistics partners and offer an appropriate remedy (re-dispatch, replacement, or refund).</li>
            <li><span className='font-semibold'>Product Quality Issues:</span> For genuine manufacturing defects or damage in transit, we offer repair, replacement, or refund as per our Return &amp; Refund Policy. Colour variations due to lighting, camera, and display settings are not considered manufacturing defects.</li>
            <li><span className='font-semibold'>Refund and Return Disputes:</span> We review the status of your return, the condition of the product (if received), and applicable policy terms. Approved refunds are processed through the original payment method within the timeline stated in our Return &amp; Refund Policy.</li>
            <li><span className='font-semibold'>Payment Issues:</span> For failed transactions, double charges, or refund delays, we coordinate with our payment gateway (Cashfree Payments) and your bank if needed, sharing transaction IDs and UTR numbers where applicable.</li>
            <li><span className='font-semibold'>Account and Privacy Issues:</span> We verify your identity and take appropriate steps (password reset, securing the account, reviewing data requests). Data access, correction, deletion, or consent withdrawal requests are handled per our Privacy Policy.</li>
            <li><span className='font-semibold'>Website, Pricing, and Coupon Issues:</span> We verify the applicable terms and our records, and in case of genuine errors on our side, offer an appropriate remedy (price adjustment, coupon credit, or order cancellation with refund).</li>
          </ul>
        </Section>

        <Section number='6' title='Escalation Within LOCOXO'>
          <p>If you are not satisfied with the initial response or resolution, you may escalate your grievance by emailing locoxo.support@gmail.com with the subject line: "Escalation – [Your Name] – [Order ID]". Include your original complaint details, previous communication references (emails, ticket numbers, chat transcripts), and the reason you are not satisfied.</p>
          <p>We will review your escalation within 5 business days, assign it to a senior member of our team for re-evaluation, and communicate the final decision or further steps required.</p>
        </Section>

        <Section number='7' title='External Recourse'>
          <p>
            If your grievance is not resolved to your satisfaction even after following the above process, you may have the
            right to approach the appropriate Consumer Disputes Redressal Commission under the Consumer Protection Act, 2019,
            depending on the value of your claim and your location. You may also refer to our Terms of Use for details on
            governing law and jurisdiction.
          </p>
        </Section>

        <Section number='8' title='Record Keeping'>
          <p>We maintain internal records of grievances received, actions taken, and resolutions provided, for quality improvement and training, compliance with applicable laws and regulatory requirements, and handling any future disputes or references. These records are maintained in line with our data retention practices described in our Privacy Policy.</p>
        </Section>

        <Section number='9' title='Changes to This Grievance Policy'>
          <p>
            We may update this Grievance Policy from time to time to reflect changes in our operations, feedback, or legal
            requirements. The "Last updated" date at the top will be revised. Significant changes will be notified via email,
            Site banner, or other appropriate means. Continued use of the Site and our services after changes constitutes
            acceptance of the updated policy.
          </p>
        </Section>

        <Section number='10' title='Contact'>
          <p>For any questions regarding this Grievance Policy, you can contact us at:</p>
          <div className='bg-gray-50 border border-gray-200 p-4 mt-2'>
            <p className='font-semibold text-gray-800'>LOCOXO APPARELS</p>
            <p>Email: <a href='mailto:locoxo.support@gmail.com' className='underline hover:text-black'>locoxo.support@gmail.com</a> (monitored daily)</p>
            <p>Phone / WhatsApp: +91 88245 89682 (Monday to Saturday, 10:00 AM to 8:00 PM IST; Sunday closed)</p>
            <p>Address: 2400/67, Friends Colony, Street No. 2, Badi Haibowal, Ludhiana, Punjab – 141001, India</p>
          </div>
        </Section>
      </div>
    </div>
  )
}

export default GrievancePolicy
