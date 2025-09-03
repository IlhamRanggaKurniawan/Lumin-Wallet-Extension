import Header from '@/components/Header'
import Input from '@/components/Input'
import PhraseInput from '@/components/PhraseInput'
import { Button } from '@/components/ui/button'
import { importOrCreateWallet, validateMnemonicPhrase } from '@/lib/mnemonic'
import useAuthStore from '@/lib/store/authStore'
import { useWalletStore } from '@/lib/store/walletStore'
import { storage } from '@/lib/utils/storage'
import { Eye, EyeOff, FileLock2, LockKeyhole } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Import = () => {
    const [isValid, setIsValid] = useState(false)
    const [error, setError] = useState("")
    const [words, setWords] = useState<string[]>(Array(12).fill(""))
    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState({
        newPassword: false,
        confirmPassword: false
    })
    const navigate = useNavigate()
    const { login } = useAuthStore()
    const { setAddress} = useWalletStore()

    const handleChange = (index: number, value: string) => {
        const cleaned = value.trim().split(" ")[0] || ""

        const updated = [...words]
        updated[index] = cleaned
        setWords(updated)
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData("text")

        const parts = pasted.trim().split(/\s+/)

        const updated = [...words]

        parts.forEach((word, i) => {
            if (index + i < updated.length) {
                updated[index + i] = word
            }
        })
        setWords(updated)
    }

    const validate = () => {
        const phrase = words.join(" ").trim()
        const isValid = validateMnemonicPhrase(phrase)

        if (!isValid) {
            setError("invalid mnemonic phrase")
            return
        }

        setError("")
        setIsValid(true)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password.newPassword.length < 8) {
            return setError("Password should be minimum 8 characters")
        }

        if (password.newPassword !== password.confirmPassword) {
            return setError("Password doen't match")
        }

        const data = await importOrCreateWallet(password.newPassword, words.join(" ").trim())

        login()

        await storage.setItem("mnemonic", data, "local")
        setAddress("0xcD2bE3b031a88445ff28e99685eEf01B24833399")

        navigate("/")
    }

    return (
        <div className="flex flex-col justify-between h-full min-h-[calc(100vh-32px)]">
            {isValid ? (
                <form className='contents' onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <Header title="Create Password" />
                        <div className="pt-12">
                            <div className="aspect aspect-square w-fit p-4 bg-accent rounded-xl mx-auto">
                                <LockKeyhole />
                            </div>
                            <p className="text-zinc-500 text-center text-sm w-[80%] mx-auto py-4">You’ll need this to unlock your wallet and access your recovery phrase</p>
                        </div>
                        <div className="space-y-5">
                            <Input
                                Icon={showPassword.newPassword ? EyeOff : Eye}
                                value={password.newPassword}
                                placeholder='New Password'
                                required
                                onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                                autoFocus
                                type={showPassword.newPassword ? "text" : "password"}
                                handleClick={() => setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })}
                            />
                            <Input
                                Icon={showPassword.confirmPassword ? EyeOff : Eye}
                                value={password.confirmPassword}
                                placeholder='Confirm Password'
                                required
                                onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
                                type={showPassword.confirmPassword ? "text" : "password"}
                                handleClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}
                            />
                            <p className='text-red-500 text-base py-4'>{error}</p>
                        </div>
                    </div>

                    <Button className="py-6" variant={"outline"}>
                        Continue
                    </Button>
                </form>
            ) : (
                <>
                    <div>
                        <Header title="Enter your recovery phrase" />
                        <div className="pt-12">
                            <div className="aspect aspect-square w-fit p-4 bg-accent rounded-xl mx-auto">
                                <FileLock2 />
                            </div>
                            <p className="text-zinc-500 text-center text-sm w-[80%] mx-auto py-4">Type or paste your 12-word recovery phrase</p>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <PhraseInput
                                    number={i + 1}
                                    key={i}
                                    value={words[i]}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    onPaste={(e) => handlePaste(e, i)}
                                />
                            ))}
                        </div>
                        <p className='text-red-500 text-base py-4'>{error}</p>
                    </div>
                    <Button className="py-6" variant={"outline"} onClick={validate}>
                        Continue
                    </Button>

                </>
            )}

        </div>
    )
}

export default Import