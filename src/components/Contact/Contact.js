// styles
import { Paragraph, Heading } from "@twilio-paste/core";
import "./Contact.css";

const formatAsUSD = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const formatPhoneNumber = (number) => {
  const cleaned = ("" + number).replace(/\D/g, ""); // Remove non-numeric characters
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/); // Match groups of 3, 3, and 4 digits

  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }

  return null; // Return null if the number couldn't be formatted
};

const printJsonObj = (jsonObj) => {
  return Object.keys(jsonObj).map((key) => {
    const value = jsonObj[key];
    if (!value || (typeof value === "string" && value.startsWith("$"))) {
      return null;
    }

    let parsedValue = value;

    let _obj = false;
    if (typeof value === "string" && value.startsWith("{")) {
      try {
        parsedValue = JSON.parse(value);
        _obj = true;
        printJsonObj(parsedValue);
      } catch (err) {
        console.log("Error paesing JSON", err);
      }
    }

    const numericalValue = parseFloat(value);

    return (
      !_obj && (
        <div key={key}>
          <Heading as="h4" variant="heading30">
            {key} -{" "}
            {isNaN(numericalValue)
              ? value
              : key == "phoneNumber"
              ? formatPhoneNumber(value)
              : formatAsUSD(value)}
          </Heading>
        </div>
      )
    );
    console.log(`Heading: ${key}`);
    console.log(`Value: ${jsonObj[key]}`);
  });
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
        <br></br>
        <br></br>
        <Heading as="h2" variant="heading10">
          IVR / Google Dialogflow Handoff Info
        </Heading>
        {printJsonObj(agentHandoffParams)}
        {agentHandoffParams.applicationInquiry &&
          !agentHandoffParams?.applicationInquiry?.match(/^\$/) && (
            <>
              <Heading as="h3" variant="heading20">
                Application Inquiry
              </Heading>
              <Paragraph>{agentHandoffParams.applicationInquiry}</Paragraph>
            </>
          )}
        {agentHandoffParams.applicationIntent &&
          !agentHandoffParams.applicationIntent.match(/^\$/) && (
            <>
              <Heading as="h3" variant="heading20">
                Application Intent
              </Heading>
              <Paragraph>{agentHandoffParams.applicationIntent}</Paragraph>
            </>
          )}
        {agentHandoffParams.applicationNumber &&
          !agentHandoffParams?.applicationNumber?.match(/^\$/) && (
            <>
              <Heading as="h3" variant="heading20">
                Application Number
              </Heading>
              <Paragraph>{agentHandoffParams.applicationNumber}</Paragraph>
            </>
          )}
        {agentHandoffParams.applicationSupport &&
          !agentHandoffParams?.applicationSupport?.match(/^\$/) && (
            <>
              <Heading as="h3" variant="heading20">
                Application Support
              </Heading>
              <Paragraph>{agentHandoffParams.applicationSupport}</Paragraph>
            </>
          )}
        {agentHandoffParams.bankProduct &&
          !agentHandoffParams?.bankProduct?.match(/^\$/) && (
            <>
              <Heading as="h3" variant="heading20">
                Bank Product
              </Heading>
              <Paragraph>{agentHandoffParams.bankProduct}</Paragraph>
            </>
          )}
        {agentHandoffParams.custName &&
          !agentHandoffParams?.custName?.match(/^\$/) && (
            <>
              <Heading as="h3" variant="heading20">
                Customer Name
              </Heading>
              <Paragraph>{agentHandoffParams.custName}</Paragraph>
            </>
          )}
        {agentHandoffParams.liveAgentHandoff &&
          !agentHandoffParams?.liveAgentHandoff?.match(/^\$/) && (
            <>
              <Heading as="h3" variant="heading20">
                Live Agent Handoff Reason
              </Heading>
              <Paragraph>{agentHandoffParams.liveAgentHandoff}</Paragraph>
            </>
          )}
        {agentHandoffParams.loanInformation &&
          !agentHandoffParams.loanInformation?.match(/^\$/) && (
            <>
              <Heading as="h3" variant="heading20">
                Loan Information
              </Heading>
              {printJsonObj(
                JSON.parse(
                  taskInfo.agentHandoffObj.AgentHandoffParameters
                    .loanInformation
                )
              )}
            </>
          )}
      </div>
    );
  } catch {
    return (
      <div className="contact-info">
        {typeof taskInfo.agentHandoffObj === "object"
          ? 'No Info - There was a problem getting data from Dialogflow'
          : 'No Data'}
      </div>
    );
  }
}
