import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import BurgerPreview from "../BurgerPreview";
import { OrderDetail } from ".";
import Spinner from "../UI/Spinner";
import * as mapErrorToAlert from "../Util/mapErrorToAlert";

configure({ adapter: new Adapter() });

describe("OrderDetail", () => {
    let mockProps;
    let mockState;
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
        
        mockState = {
            processingDelete: false
        };

        wrapper = shallow(<OrderDetail {...mockProps} deleteOrder={mockProps.deleteOrder}/>);
        wrapper.setState(mockState);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should render Spinner when processing deletion", () => {
        wrapper.setState({ processingDelete: true });
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