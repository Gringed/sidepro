import { Section } from "@/features/landing/Section";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col w-full h-full ">
      <Section className="flex flex-col items-start text-medium text-justify !px-[250px] h-full py-10  w-full">
        <h1 className="text-3xl font-black self-center text-primary">
          {" "}
          Terms and Conditions{" "}
        </h1>
        <div>
          <p>1. Introduction</p>
          <p>
            By using SidePro you confirm your acceptance of, and agree to be
            bound by, these terms and conditions.
          </p>
        </div>
        <div>
          <p>2. Agreement to Terms and Conditions</p>
          <p>
            This Agreement takes effect on the date on which you first use the
            SidePro application.
          </p>
        </div>
        <div>
          <p>3. Unlimited Access Software</p>
          <p>
            License with Termination Rights The SidePro Software License
            facilitates the acquisition of SidePro software through a single
            purchase, granting users unrestricted and perpetual access to its
            comprehensive functionalities. Tailored for independent creators,
            entrepreneurs, and small businesses, SidePro empowers users to
            create compelling web pages and online portfolios. This license
            entails a straightforward and flexible arrangement, exempting users
            from recurring fees or subscriptions. However, it is important to
            acknowledge that the licensor retains the right to terminate the
            license without conditions or prerequisites. This termination
            provision enables the licensor to exercise control over software
            distribution and utilization. Opting for the SidePro Software
            License enables users to enjoy the benefits of the software while
            recognizing the licensor's unrestricted termination rights, which
            provide adaptability and address potential unforeseen circumstances.
          </p>
        </div>
        <div>
          <p>5. Disclaimer</p>
          <p>
            It is not warranted that SidePro will meet your requirements or that
            its operation will be uninterrupted or error free. All express and
            implied warranties or conditions not stated in this Agreement
            (including without limitation, loss of profits, loss or corruption
            of data, business interruption or loss of contracts), so far as such
            exclusion or disclaimer is permitted under the applicable law are
            excluded and expressly disclaimed. This Agreement does not affect
            your statutory rights.
          </p>
        </div>
        <div>
          <p>6. Warranties and Limitation of Liability</p>
          <p>
            SidePro does not give any warranty, guarantee or other term as to
            the quality, fitness for purpose or otherwise of the software. Indie
            Page shall not be liable to you by reason of any representation
            (unless fraudulent), or any implied warranty, condition or other
            term, or any duty at common law, for any loss of profit or any
            indirect, special or consequential loss, damage, costs, expenses or
            other claims (whether caused by SidePro's negligence or the
            negligence of its servants or agents or otherwise) which arise out
            of or in connection with the provision of any goods or services by
            SidePro. SidePro shall not be liable or deemed to be in breach of
            contract by reason of any delay in performing, or failure to
            perform, any of its obligations if the delay or failure was due to
            any cause beyond its reasonable control. Notwithstanding contrary
            clauses in this Agreement, in the event that SidePro are deemed
            liable to you for breach of this Agreement, you agree that Indie
            Page's liability is limited to the amount actually paid by you for
            your services or software, which amount calculated in reliance upon
            this clause. You hereby release SidePro from any and all
            obligations, liabilities and claims in excess of this limitation.
          </p>
        </div>
        <div>
          <p>7.Responsibilities</p>
          <p>
            SidePro is not responsible for what the user does with the
            user-generated content.
          </p>
        </div>
        <div>
          <p>8. General Terms and Law</p>
          <p>
            This Agreement is governed by the laws of France. You acknowledge
            that no joint venture, partnership, employment, or agency
            relationship exists between you and SidePro as a result of your use
            of these services. You agree not to hold yourself out as a
            representative, agent or employee of SidePro. You agree that SidePro
            will not be liable by reason of any representation, act or omission
            to act by you.
          </p>
        </div>
        <p>Last updated: 01 June 2024.</p>
      </Section>
    </div>
  );
};

export default page;
