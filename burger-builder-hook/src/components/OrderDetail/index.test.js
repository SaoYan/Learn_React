import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import * as react from "react";

import BurgerPreview from "../BurgerPreview";
import { OrderDetail } from ".";
import Spinner from "../UI/Spinner";
import * as mapErrorToAlert from "../Util/mapErrorToAlert";

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

describe("OrderDetail", () => {
    let mockProps;
    let useStateSpy;
    let wrapper;

    beforeEach(() => {
        jest.spyOn(mapErrorToAlert, "dataErrorAlert")
            .mockImplementation((error) => {});

        mockProps = {
            token: "TOKEN",
            match: {
                params: {
                    key: "ORDER_ID"
                }
            },
            orders: {
                ORDER_ID: {
                    ingredients: {
                        ing1: 1,
                        ing2: 2
                    },
                    customer: {
                        name: "NAME",
                        address: {
                            street: "STREET",
                            city: "CITY",
                            province: "PROVINCE",
                            postalCode: "POSTAL_CODE"
                        },
                        email: "EMAIL",
                        phone: "PHONE",
                        timeStamp: "TIMESTAMP"
                    }
                }
            },
            deleteOrder: jest.fn().mockImplementation(() => Promise.resolve())
        };

        wrapper = shallow(<OrderDetail {...mockProps} deleteOrder={mockProps.deleteOrder}/>);
    });

    afterEach(() => {
        jest.clearAllMocks();
        if (useStateSpy) {
            useStateSpy.mockRestore();
        }
    });

    it("Should render Spinner when processing deletion", () => {
        useStateSpy = mockUseState([true]);
        wrapper = shallow(<OrderDetail {...mockProps} deleteOrder={mockProps.deleteOrder}/>);
        
        expect(wrapper.equals(<Spinner />)).toEqual(true);
    });

    it("Shold display the BurgerPreview based on the ingredients", () => {
        expect(
            wrapper.contains(<BurgerPreview ingredients={mockProps.orders.ORDER_ID.ingredients}/>)
        ).toEqual(true);
    });

    it("Should display the summary of the ingredients", () => {
        expect(wrapper.find("li[children='ing1: x1']")).toHaveLength(1);
        expect(wrapper.find("li[children='ing2: x2']")).toHaveLength(1);
    });

    it("Should hanle the click event - delete order", () => {
        wrapper.find("button[children='Delete']").simulate("click");

        expect(mockProps.deleteOrder).toHaveBeenCalledTimes(1);
        expect(mockProps.deleteOrder).toBeCalledWith({
            token: mockProps.token,
            orderId: mockProps.match.params.key
        });
    });
});