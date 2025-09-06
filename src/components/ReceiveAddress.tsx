import { useWalletStore } from '@/lib/store/walletStore'
import { Copy } from 'lucide-react'
import { useEffect, useState } from 'react';
import QRCode from "qrcode";

const ReceiveAddress = () => {
    const [qr, setQr] = useState("");
    const { address } = useWalletStore()
    const ethUri = `ethereum:${address}`;

    useEffect(() => {
        QRCode.toDataURL(ethUri).then(setQr);
    }, [ethUri]);

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(address || "")
    }

    return (
        <div className='flex flex-col items-center justify-center pt-12 gap-6'>
            <div className='overflow-hidden rounded-xl border aspect-square w-52'>
                {qr && <img src={qr} className='w-full h-full'/>}
            </div>
            <div className='text-center space-y-2'>
                <p className='text-lg font-semibold'>Wallet 1</p>
                <div onClick={() => handleCopyAddress()} className='text-zinc-500 flex items-center gap-2 text-base cursor-pointer'>
                    <p>{address?.slice(0, 6)}...{address?.slice(-4)}</p>
                    <Copy className='size-4' />
                </div>
            </div>
        </div>
    )
}

export default ReceiveAddress