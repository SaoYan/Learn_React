import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import { Orders } from ".";
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
            fetchOrders: jest.fn().mockImplementation(() => Promise.resolve())
        };

        mockState = {
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

    it("Should render Spinner when processing deletion", () => {
        wrapper.setState({ processingDelete: true });
        expect(wrapper.equals(<Spinner />)).toEqual(true);
    });
});