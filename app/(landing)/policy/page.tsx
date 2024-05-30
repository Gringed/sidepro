import { Section } from "@/features/landing/Section";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col w-full h-full ">
      <Section className="flex flex-col items-start text-medium text-justify !px-[250px] h-full py-10  w-full">
        <h1 className="text-3xl font-black self-center text-primary">
          {" "}
          Privacy Policy{" "}
        </h1>
        <p className="">
          Your privacy is important to us. It is SidePro policy to respect your
          privacy regarding any information we may collect from you across our
          website, and other sites we own and operate. We only ask for personal
          information when we truly need it to provide a service to you.
        </p>
        <p>
          We collect it by fair and lawful means, with your knowledge and
          consent. We also let you know why we're collecting it and how it will
          be used. You can sign up with your Google account so your SidePro
          account username will be prefilled with your name and your public
          profile picture.
        </p>
        <p>
          We only retain collected information for as long as necessary to
          provide you with your requested service. What data we store, we'll
          protect within commercially acceptable means to prevent loss and
          theft, as well as unauthorised access, disclosure, copying, use or
          modification.
        </p>
        We don't share any personally identifying information publicly or with
        third-parties, except when required to by law.
        <p>
          We act in the capacity of a data controller and a data processor with
          regard to the personal data processed through Indie Page and the
          services in terms of the applicable data protection laws, including
          the EU General Data Protection Regulation (GDPR).
        </p>
        <p>
          Our website may link to external sites that are not operated by us.
          Please be aware that we have no control over the content and practices
          of these sites, and cannot accept responsibility or liability for
          their respective privacy policies.
        </p>
        <p>
          You are free to refuse our request for your personal information, with
          the understanding that we may be unable to provide you with some of
          your desired services. Your continued use of our website will be
          regarded as acceptance of our practices around privacy and personal
          information.
        </p>
        <p>
          If you have any questions about how we handle user data and personal
          information, feel free to contact us.
        </p>
        <p>This policy is effective as of 01 June 2024.</p>
      </Section>
    </div>
  );
};

export default page;
