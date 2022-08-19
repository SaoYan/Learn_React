import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import * as react from "react";

import { Contact } from ".";
import FormItem from "../../UI/FormItem";
import Spinner from "../../UI/Spinner";
import * as mapErrorToAlert from "../../Util/mapErrorToAlert";

configure({ adapter: new Adapter() });

const mockUseState = (state) => {
    let stateNo = 1;
    const useStateSpy =  jest.spyOn(react, "useState").mockImplementation((initState) => {
        initState = state[stateNo- 1];
        stateNo++;
        return [initState, jest.fn()]
    });
    return useStateSpy;
}

describe("Contact", () => {
    let mockProps;
    let entireForm;
    let sampleInputForm;
    let sampleSelectForm;
    let fees;
    let wrapper;
    let useStateSpy;

    beforeEach(() => {
        jest.spyOn(mapErrorToAlert, "dataErrorAlert")
            .mockImplementation((error) => {});

        sampleInputForm = {
            keyInput: {
                type: "text",
                required: true,
                value: "INPUT_VALUE",
                caption: "INPUT_CAPTION"
            }
        };

        sampleSelectForm = {
            keySelect: {
                type: "select",
                required: false,
                value: "SELECT_VALUE",
                caption: "SELECT_CAPTION",
                options: [
                    {value: "OPTION1", displayName: "OPTION1"},
                    {value: "OPTION2", displayName: "OPTION2"},
                    {value: "OPTION3", displayName: "OPTION3"}
                ]
            }
        }

        entireForm = {
            name: { value: "NAME" },
            street: { value: "STREET" },
            province: { value: "PROVINCE" },
            city: { value: "VALUE" },
            postalCode: { value: "POSTAL_CODE" },
            email: { value: "EMAIL" },
            phone: { value: "PHONE" },
            delivery: { value: "DELIVERY" }
        }

        mockProps = {
            token: "TOKEN",
            userId: "USERID",
            ingredients: "INGREDIENTS",
            price: 10,
            placeOrder: jest.fn().mockImplementation(() => Promise.resolve())
        };

        fees = {
            tax: {
                GST_HST: 0,
                PST: 0
            },
            deliveryFee: 0,
            finalPrice: mockProps.price
        };

        wrapper = shallow(<Contact {...mockProps} placeOrder={mockProps.placeOrder}/>);
    });

    afterEach(() => {
        jest.clearAllMocks();
        if (useStateSpy) {
            useStateSpy.mockRestore();
        }
    });

    it("Should render Spinner when processing order", () => {
        useStateSpy = mockUseState([true, null, null]);
        wrapper = shallow(<Contact {...mockProps} placeOrder={mockProps.placeOrder}/>);

        expect(wrapper.equals(<Spinner />)).toEqual(true);
    });

    it("Should render <input> elements based on the given form content", () => {
        useStateSpy = mockUseState([false, sampleInputForm, fees]);
        wrapper = shallow(<Contact {...mockProps} placeOrder={mockProps.placeOrder}/>);

        expect(wrapper.find(FormItem)).toHaveLength(1);
        expect(wrapper.find(FormItem).prop("caption")).toEqual(sampleInputForm.keyInput.caption);

        expect(wrapper.find(`input[type='${sampleInputForm.keyInput.type}']`)).toHaveLength(1);
        expect(
            wrapper.find(`input[type='${sampleInputForm.keyInput.type}']`).prop("required")
        ).toEqual(sampleInputForm.keyInput.required);
        expect(
            wrapper.find(`input[type='${sampleInputForm.keyInput.type}']`).prop("value")
        ).toEqual(sampleInputForm.keyInput.value);
    });

    it("Should render <select> elements based on the given form content", () => {
        useStateSpy = mockUseState([false, sampleSelectForm, fees]);
        wrapper = shallow(<Contact {...mockProps} placeOrder={mockProps.placeOrder}/>);

        expect(wrapper.find(FormItem)).toHaveLength(1);
        expect(wrapper.find(FormItem).prop("caption")).toEqual(sampleSelectForm.keySelect.caption);

        expect(wrapper.find("select")).toHaveLength(1);
        expect(wrapper.find("select").children("option"))
            .toHaveLength(sampleSelectForm.keySelect.options.length);
    });

    it("Should handle the submit event", () => {
        useStateSpy = mockUseState([false, entireForm, fees]);
        wrapper = shallow(<Contact {...mockProps} placeOrder={mockProps.placeOrder}/>);
        wrapper.find("form").simulate("submit", { preventDefault: () => {} });

        expect(mockProps.placeOrder).toHaveBeenCalledTimes(1);
        expect(mockProps.placeOrder.mock.calls[0][0]).toMatchObject({
            token: mockProps.token,
            summary: {
                userId: mockProps.userId,
                ingredients: mockProps.ingredients,
                price: fees.finalPrice,
                customer: {
                    name: entireForm.name.value,
                    address: {
                        street: entireForm.street.value,
                        province: entireForm.province.value,
                        city: entireForm.city.value,
                        postalCode: entireForm.postalCode.value
                    },
                    email: entireForm.email.value,
                    phone: entireForm.phone.value
                },
                delivery: entireForm.delivery.value
            }
        });
    });
});