import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import OrderList from "./OrderList";
import OrderItem from "./OrderItem";
import * as mapErrorToAlert from "../Util/mapErrorToAlert";

configure({ adapter: new Adapter() });

describe("OrderList", () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
        spyOn(mapErrorToAlert, "dataErrorAlert");

        mockProps = {
            dataResource: {
                read: () => ({
                    order1: {},
                    order2: {}
                })
            },
            clearOrdersHandler: jest.fn()
        };

        wrapper = shallow(
            <OrderList
                {...mockProps}
                clearOrdersHandler={mockProps.clearOrdersHandler}
            />
        );
    });

    it("Should render nothing when no valid dataResource if provided", () => {
        wrapper.setProps({ dataResource: null });
        expect(wrapper.type()).toBeNull();
    });

    it("Should inform user when no order found", () => {
        wrapper.setProps({
            dataResource: {
                read: () => ({})
            }
        });
        expect(wrapper.equals(<h3>No order history found.</h3>)).toEqual(true);
    });

    it("Should inform user when the fetched `orders` object is null", () => {
        wrapper.setProps({
            dataResource: {
                read: () => null
            }
        });
        expect(wrapper.equals(<h3>No order history found.</h3>)).toEqual(true);
    });

    it("Should render OrderItem based on the given orders", () => {
        expect(wrapper.find(OrderItem)).toHaveLength(2);
    });

    it("Should handle click event - clear orders", () => {
        wrapper.find("button[children='Clear']").simulate("click");
        expect(mockProps.clearOrdersHandler).toHaveBeenCalledTimes(1);
    });
});