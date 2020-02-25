'use strict';

const Homey = require('homey');
const util = require('/lib/util.js');

class ShellyEmDevice extends Homey.Device {

  onInit() {
    new Homey.FlowCardTriggerDevice('triggerMeterPowerConsumed').register();
    new Homey.FlowCardTriggerDevice('triggerMeterPowerReturned').register();
    new Homey.FlowCardTriggerDevice('triggerReactivePower').register();

    // LISTENERS FOR UPDATING CAPABILITIES
    this.registerCapabilityListener('onoff', (value, opts) => {
      if (value) {
        return util.sendCommand('/relay/0?turn=on', this.getSetting('address'), this.getSetting('username'), this.getSetting('password'));
      } else {
        return util.sendCommand('/relay/0?turn=off', this.getSetting('address'), this.getSetting('username'), this.getSetting('password'));
      }
    });
  }

}

module.exports = ShellyEmDevice;
