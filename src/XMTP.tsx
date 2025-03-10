import { Client, type Signer } from "@xmtp/browser-sdk";
import { useAccount, useConnect, useConnectors, useSignMessage } from "wagmi";

const KEYS: any = [94, 90, 108, 132, 224, 215, 92, 209,
    248, 130, 152, 69, 189, 131, 124, 120,
    93, 244, 134, 72, 41, 56, 94, 23,
    251, 186, 121, 212, 242, 248, 31, 30]

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


        const signer: Signer = {
            getAddress: () => _address,
            signMessage: async (message: string) => {
                debugger
                return signMessageAsync(message)
            }
        }
        const createClient = await Client.create(
            signer,
            KEYS,
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
