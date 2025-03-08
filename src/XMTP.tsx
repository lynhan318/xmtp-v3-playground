import { Client, type Signer } from "@xmtp/browser-sdk";
import { useAccount, useConnect, useConnectors, useSignMessage } from "wagmi";

export const XMTP = () => {
    const { signMessageAsync } = useSignMessage()
    const { connectAsync } = useConnect()
    const { address } = useAccount()
    const connectors = useConnectors()

    const createXMTPClient = async () => {
        let _address = address
        if (!_address) {
            const { accounts } = await connectAsync({
                connector: connectors[0],
            })
            _address = accounts[0]
        }

        const encryptionKey = window.crypto.getRandomValues(new Uint8Array(32));
        const signer: Signer = {
            getAddress: () => _address,
            signMessage: async (message: string) => {
                debugger
                return signMessageAsync(message)
            }
        }
        debugger
        const createClient = await Client.create(
            signer,
            encryptionKey,
            { env: 'production' }
        );
        debugger

    }
    return (
        <div>
            <button type="button" onClick={createXMTPClient}>Connect</button>
        </div>
    )
}
