import * as React from 'react';
import { createContext, useContext, useState, useRef } from 'react';
import '@/components/providers/DialogProvider.scss';

type ProviderContext = readonly [(option: DialogOption) => void, () => void, DialogParams[]];

type DialogParams = {
    children: React.ReactNode;
    open: boolean;
    onClose?: () => void;
};

type DialogOption = Omit<DialogParams, 'open'>;

type DialogContainerProps = DialogParams & {
    onClose: () => void;
};

type DialogProviderProps = {
    children: React.ReactNode;
};

const DialogContext = createContext<ProviderContext>([() => {}, () => {}, []]);
export const useDialog = () => useContext(DialogContext);

const DialogContainer = (props: DialogContainerProps) => {
    const { children, open, onClose } = props;
    return (
        <React.Fragment>
            {open && (
                <div className="dialog-container" onClick={onClose}>
                    {children}
                </div>
            )}
        </React.Fragment>
    );
};

const DialogProvider = (props: DialogProviderProps) => {
    const { children } = props;
    const [dialogs, setDialogs] = useState<DialogParams[]>([]);

    const createDialog = (option: DialogOption) => {
        const dialog = { ...option, open: true };
        setDialogs((dialogs) => [...dialogs, dialog]);
    };

    const closeDialog = () => {
        setDialogs((dialogs) => {
            const latestDialog = dialogs.pop();
            if (!latestDialog) return dialogs;
            if (latestDialog.onClose) latestDialog.onClose();
            return [...dialogs].concat({ ...latestDialog, open: false });
        });
    };

    const contextValue = useRef([createDialog, closeDialog, dialogs] as const);

    return (
        <DialogContext.Provider value={contextValue.current}>
            {children}
            {dialogs.map((dialog, i) => {
                const { onClose, ...dialogParams } = dialog;

                return <DialogContainer key={i} onClose={onClose ? onClose : closeDialog} {...dialogParams} />;
            })}
        </DialogContext.Provider>
    );
};

export default DialogProvider;
