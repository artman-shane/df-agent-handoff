// styles
import { Paragraph, Heading } from "@twilio-paste/core";
import { ThemeProvider } from "@twilio-paste/core";
import { Icon } from "@twilio/flex-ui";
import { object } from "prop-types";
import "./Contact.css";

const CreateInfo = (attribute) => {
  // console.log("CreateInfo - Attribute:", attribute);
  return (
    <>
      <Heading as="h2" variant="heading10">
        {attribute[0]}
      </Heading>
      {/* {(key && <Paragraph key={key + value}>{value}</Paragraph>) || "No Value"} */}
    </>
  );
};

export default function Contact(taskAttributes) {
  const taskInfo = taskAttributes.task.attributes;
  try {
    const agentHandoffParams = taskInfo.agentHandoffObj.AgentHandoffParameters;
    console.log("Trying to parse taskInfo");
    console.log(taskInfo.agentHandoffObj);

    // console.log(agentHandoffObj);
    return (
      <div className="contact-info">
        <Heading as="h2" variant="heading10">
          Called
        </Heading>
        <Paragraph>
          {taskInfo.called.match(/^\$*$/) ? "---" : taskInfo.called}
        </Paragraph>
        <Heading as="h2" variant="heading10">
          Caller
        </Heading>
        <Paragraph>{taskInfo.caller}</Paragraph>
        <Heading as="h2" variant="heading10">
          Caller Zip
        </Heading>
        <Paragraph>{taskInfo.caller_zip}</Paragraph>
        <Heading as="h2" variant="heading10">
          Direction
        </Heading>
        <Paragraph>{taskInfo.direction}</Paragraph>
        <Heading as="h2" variant="heading10">
          IVR / Google Dialogflow Handoff Info
          <br></br>
          <br></br>
        </Heading>
        {!agentHandoffParams.applicationInquiry.match(/^\$/) && (
          <>
            <Heading as="h3" variant="heading20">
              Application Inquiry
            </Heading>
            <Paragraph>{agentHandoffParams.applicationInquiry}</Paragraph>
          </>
        )}
        {!agentHandoffParams.applicationIntent.match(/^\$/) && (
          <>
            <Heading as="h3" variant="heading20">
              Application Intent
            </Heading>
            <Paragraph>{agentHandoffParams.applicationIntent}</Paragraph>
          </>
        )}
        {!agentHandoffParams.applicationNumber.match(/^\$/) && (
          <>
            <Heading as="h3" variant="heading20">
              Application Number
            </Heading>
            <Paragraph>{agentHandoffParams.applicationNumber}</Paragraph>
          </>
        )}
        {!agentHandoffParams.applicationSupport.match(/^\$/) && (
          <>
            <Heading as="h3" variant="heading20">
              Application Support
            </Heading>
            <Paragraph>{agentHandoffParams.applicationSupport}</Paragraph>
          </>
        )}
        {!agentHandoffParams.bankProduct.match(/^\$/) && (
          <>
            <Heading as="h3" variant="heading20">
              Bank Product
            </Heading>
            <Paragraph>{agentHandoffParams.bankProduct}</Paragraph>
          </>
        )}
        {!agentHandoffParams.custName.match(/^\$/) && (
          <>
            <Heading as="h3" variant="heading20">
              Customer Name
            </Heading>
            <Paragraph>{agentHandoffParams.custName}</Paragraph>
          </>
        )}
        {!agentHandoffParams.liveAgentHandoff.match(/^\$/) && (
          <>
            <Heading as="h3" variant="heading20">
              Live Agent Handoff Reason
            </Heading>
            <Paragraph>{agentHandoffParams.liveAgentHandoff}</Paragraph>
          </>
        )}
      </div>
    );
  } catch {
    return <div className="contact-info">No Info - There was a problem getting data from Dialogflow</div>;
  }
}
