//Actions go here

export const TEST_ACTION = "TEST_ACTION";
export const STOCK_HOMEPAGE_ACTION = "STOCK_HOMEPAGE_ACTION";


export const testAction = param => ({
    type: TEST_ACTION,
    value: param.value
});

export const stockHomepageAction = param => ({
    type: STOCK_HOMEPAGE_ACTION,
    value: param.value
});