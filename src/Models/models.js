//Backend calls and dispatches go here

import { testAction } from '../Actions/actions';

export default class servicesModel {
    constructor(reduxStore) {
        this.reduxStore = reduxStore;
    }

    backendCall(testParam) {
        let dispatchVal = {
            value : testParam
        };
        this.reduxStore.dispatch(testAction(dispatchVal));
    }
}