//Actions go here

export const TEST_ACTION = "TEST_ACTION";

export const testAction = param => ({
    type: TEST_ACTION,
    value: param.value
});