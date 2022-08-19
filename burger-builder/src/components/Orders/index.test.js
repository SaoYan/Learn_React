import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import { Orders } from ".";
import OrderItem from "./OrderItem";
import Spinner from "../UI/Spinner";
import * as mapErrorToAlert from "../Util/mapErrorToAlert";

configure({ adapter: new Adapter() });

describe("Orders", () => {
    let mockProps;
    let mockState;
    let wrapper;

    beforeEach(() => {
        jest.spyOn(mapErrorToAlert, "dataErrorAlert")
            .mockImplementation((error) => {});

        mockProps = {
            isAuthenticated: false,
            token: "TOKEN",
            userId: "ISER_ID",
            orders: {
                ORDER1: {},
                ORDER2: {},
                ORDER3: {}
            },
            fetchOrders: jest.fn().mockImplementation(() => Promise.resolve()),
            clearOrders: jest.fn().mockImplementation(() => Promise.resolve())
        };

        mockState = {
            loadingOrders: false,
            loadingError: false,
            processingDelete: false
        };

        wrapper = shallow(
            <Orders
                {...mockProps}
                fetchOrders={mockProps.fetchOrders}
                clearOrders={mockProps.clearOrders}
            />
        );
        wrapper.setState(mockState);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should not fetch orders if not authenticated", () => {
        expect(mockProps.fetchOrders).not.toHaveBeenCalled();
    });

    it("Should fetch orders if authenticated", () => {
        wrapper = shallow(
            <Orders
                {...mockProps}
                isAuthenticated={true}
                fetchOrders={mockProps.fetchOrders}
            />
        );
        expect(mockProps.fetchOrders).toHaveBeenCalledTimes(1);
        expect(mockProps.fetchOrders).toBeCalledWith({
            token: mockProps.token,
            userId: mockProps.userId
        });
    });

    it("Should render Spinner when loading orders", () => {
        wrapper.setState({ loadingOrders: true });
        expect(wrapper.equals(<Spinner />)).toEqual(true);
    });

    it("Should inform user when error occurs", () => {
        wrapper.setState({ loadingError: true });
        expect(wrapper.equals(
            <React.Fragment>
                <h3>Ops, something went wrong.</h3>
                <h3>Fail to load order history.</h3>
            </React.Fragment>
        )).toEqual(true);
    });

    it("Should inform user if no orders are found", () => {
        wrapper.setProps({ orders: {} });
        expect(wrapper.equals(<h3>No order history found.</h3>)).toEqual(true);
    });

    it("Should render Spinner when processing deletion", () => {
        wrapper.setState({ processingDelete: true });
        expect(wrapper.equals(<Spinner />)).toEqual(true);
    });

    it("Should render OrderItem based on the fetched orders", () => {
        expect(wrapper.find(OrderItem)).toHaveLength(3);
    });

    it("Should handle click event - clear orders", () => {
        wrapper.find("button[children='Clear']").simulate("click");
        expect(mockProps.clearOrders).toHaveBeenCalledTimes(1);
        expect(mockProps.clearOrders).toBeCalledWith({
            token: mockProps.token,
            userId: mockProps.userId,
            orders: mockProps.orders
        });
    });
});