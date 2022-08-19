import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import { Contact } from ".";
import FormItem from "../../UI/FormItem";
import Spinner from "../../UI/Spinner";
import * as mapErrorToAlert from "../../Util/mapErrorToAlert";

configure({ adapter: new Adapter() });

describe("Contact", () => {
    let mockProps;
    let mockState;
    let entireForm;
    let sampleInputForm;
    let sampleSelectForm;
    let wrapper;

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

        mockState = {
            processingOrder: false,
            form: {},
            finalPrice: 20
        };

        wrapper = shallow(<Contact {...mockProps} placeOrder={mockProps.placeOrder}/>);
        wrapper.setState(mockState);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should render Spinner when processing order", () => {
        wrapper.setState({ processingOrder: true });
        expect(wrapper.equals(<Spinner />)).toEqual(true);
    });

    it("Should render <input> elements based on the given form content", () => {
        wrapper.setState({ form: sampleInputForm });

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
        wrapper.setState({ form: sampleSelectForm });

        expect(wrapper.find(FormItem)).toHaveLength(1);
        expect(wrapper.find(FormItem).prop("caption")).toEqual(sampleSelectForm.keySelect.caption);

        expect(wrapper.find("select")).toHaveLength(1);
        expect(wrapper.find("select").children("option"))
            .toHaveLength(sampleSelectForm.keySelect.options.length);
    });

    it("Should handle the submit event", () => {
        wrapper.setState({ form: entireForm });
        wrapper.find("form").simulate("submit", { preventDefault: () => {} });

        expect(mockProps.placeOrder).toHaveBeenCalledTimes(1);
        expect(mockProps.placeOrder.mock.calls[0][0]).toMatchObject({
            token: mockProps.token,
            summary: {
                userId: mockProps.userId,
                ingredients: mockProps.ingredients,
                price: mockState.finalPrice,
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