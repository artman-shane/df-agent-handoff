import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";
import { View, SideLink, Actions, Icon } from "@twilio/flex-ui";
import TestView from "./components/TestView";

import Contact from "./components/Contact/Contact";
import { Tab } from "@twilio-paste/core";

// import CustomTaskList from "./components/CustomTaskList/CustomTaskList";

const PLUGIN_NAME = "DfAgentHandoffPlugin";
const ConfigIcon = (props) => {
  return <Icon icon="InfoBold" />;
};

const ConfigIconActive = (props) => {
  return <Icon icon="Info" />;
};

export default class DfAgentHandoffPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    const options = { sortOrder: -1 };
    flex.TaskCanvas.Tabs.Content.add(
      <Contact
        icon="InfoBold"
        iconActive="Info"
        key="testing"
        taskAttributes={flex.task}
      />
    );
    flex.ViewCollection.Content.add(
      <View name="shop-view" key="shop-view">
        <div>Your Shop View Goes Here</div>
      </View>
    );

    flex.SideNav.Content.add(<TestView key="newTestView" />);
  }
}
