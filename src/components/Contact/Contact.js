// styles
import { Paragraph, Heading } from "@twilio-paste/core";
import { ThemeProvider } from "@twilio-paste/core";
import { Icon } from "@twilio/flex-ui";
import { object } from "prop-types";
import "./Contact.css";

/*
 * Agent Handoff Parameters
 *
 * agentHandoffObj: {
 * Called=+13609970062,
 * ToState=WA,
 * VirtualAgentStatus=live-agent-handoff,
 * CallerCountry=US,
 * Direction=inbound,
 * CallerState=GA,
 * ToZip=,
 * VirtualAgentProviderData=
 * {ConversationId=projects/sartman-dialogflow-demo/locations/us-central1/conversations/119_hQDHMYfQT-nPUNs9ZKTIw,
 * EndUserId=projects/sartman-dialogflow-demo/locations/us-central1/conversations/119_hQDHMYfQT-nPUNs9ZKTIw/participants/OkMWe4IYSA2pquMFERTEcg,
 * AgentHandoffParameters=
 * {
 * bankProduct=Checking Account,
 * custName=Shane,
 * liveAgentHandoff=New Application,
 * phoneNumber=7703610560,
 * test=$intent.params.BankProducts.resolved}
 * },
 * CallSid=CA28469ead06449d5c11d7b5b686591466,
 * To=+13609970062,
 * CallerZip=31119,
 * ToCountry=US,
 * ApiVersion=2010-04-01,
 * CalledZip=,
 * CallStatus=in-progress,
 * CalledCity=,
 * From=+17703610560,
 * AccountSid=AC1be3c90ff8933d4b4e8839df7ad8e798,
 * CalledCountry=US, CallerCity=ATLANTA, Caller=+17703610560, FromCountry=US, ToCity=, FromCity=ATLANTA, CalledState=WA, FromZip=31119, VirtualAgentProvider=DialogflowCX, FromState=GA}
 */

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
  // console.log("Called", taskInfo.called);
  // console.log("Caller", taskInfo.caller);
  // console.log("Caller Zip", taskInfo.caller_zip);
  // console.log("Direction", taskInfo.direction);
  // console.log(taskInfo);
  // console.log(
  //   "agentHandoffObj:",
  //   taskInfo.agentHandoffObj.VirtualAgentProviderData.AgentHandoffParameters
  // );
  // console.log("agentHandoffParameters:", taskInfo.agentHandoffParams);
  const agentHandoffParams =
    taskInfo.agentHandoffObj.VirtualAgentProviderData.AgentHandoffParameters;

  // console.log(agentHandoffObj);
  return (
    <div className="contact-info">
      <Heading as="h2" variant="heading10">
        Called
      </Heading>
      <Paragraph>{taskInfo.called}</Paragraph>
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
        Agent Handoff Info
      </Heading>
      {agentHandoffParams.applicationInquiry !=
        "$intent.params.ApplicationInquiry.resolved" && (
        <>
          <Heading as="h3" variant="heading20">
            Application Inquiry
          </Heading>
          <Paragraph>{agentHandoffParams.applicationInquiry}</Paragraph>
        </>
      )}
      {agentHandoffParams.applicationIntent !=
        "$intent.params.ApplicationIntent.resolved" && (
        <>
          <Heading as="h3" variant="heading20">
            Application Intent
          </Heading>
          <Paragraph>{agentHandoffParams.applicationIntent}</Paragraph>
        </>
      )}
      {agentHandoffParams.applicationNumber !=
        "$intent.params.ApplicationNumber.resolved" && (
        <>
          <Heading as="h3" variant="heading20">
            Application Number
          </Heading>
          <Paragraph>{agentHandoffParams.applicationNumber}</Paragraph>
        </>
      )}
      {agentHandoffParams.applicationSupport !=
        "$intent.params.ApplicationSupport.resolved" && (
        <>
          <Heading as="h3" variant="heading20">
            Application Support
          </Heading>
          <Paragraph>{agentHandoffParams.applicationSupport}</Paragraph>
        </>
      )}
      {agentHandoffParams.bankProduct !=
        "$intent.params.bankProduct.resolved" && (
        <>
          <Heading as="h3" variant="heading20">
            Bank Product
          </Heading>
          <Paragraph>{agentHandoffParams.bankProduct}</Paragraph>
        </>
      )}
      {agentHandoffParams.custName != "$intent.params.custName.resolved" && (
        <>
          <Heading as="h3" variant="heading20">
            Customer Name
          </Heading>
          <Paragraph>{agentHandoffParams.custName}</Paragraph>
        </>
      )}
      {agentHandoffParams.liveAgentHandoff !=
        "$intent.params.liveAgentHandoff.resolved" && (
        <>
          <Heading as="h3" variant="heading20">
            Live Agent Handoff Reason
          </Heading>
          <Paragraph>{agentHandoffParams.liveAgentHandoff}</Paragraph>
        </>
      )}
    </div>
  );
}
