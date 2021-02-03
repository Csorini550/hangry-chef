import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
} from "@chakra-ui/react"
import SignUpForm from "../../components/SignUpForm"


function SignUpModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>Create an account</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                {/* <ModalOverlay /> */}
                <ModalContent>
                    <Button>
                        {/* <ModalOverlay> */}
                        <ModalBody>
                            <SignUpForm />
                        </ModalBody>
                        {/* </ModalOverlay> */}
                    </Button>

                    {/* <ModalFooter> */}
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
            </Button>
                    {/* </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    )
}

export default SignUpModal;

