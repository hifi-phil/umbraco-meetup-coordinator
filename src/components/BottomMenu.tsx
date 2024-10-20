import { ReactElement } from "react";

export const BottomMenu = (props: BottomMenuProps ) => {
    return (
        <div className="fixed bottom-0 right-0 p-4">
            <div className="flex flex-col space-y-2">
                {props.children}
            </div>
        </div>
    );
};

export interface BottomMenuProps {
    children: ReactElement
}