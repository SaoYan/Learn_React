import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import Backdrop from ".";

configure({ adapter: new Adapter() });

describe("Backdrop", () => {
    it("Should render nothing if display=false", () => {
        const wrapper = shallow(<Backdrop />);
        expect(wrapper.type()).toBeNull();
    });

    it("Should render backdrop if display=true", () => {
        const wrapper = shallow(<Backdrop display/>);
        expect(wrapper.containsMatchingElement(<div />)).toEqual(true);
    });

    it("Should handle click event", () => {
        const clickHandler = jest.fn();
        const wrapper = shallow(<Backdrop display clicked={clickHandler}/>);

        wrapper.find("div").simulate("click");
        expect(clickHandler).toHaveBeenCalledTimes(1);
    });
});