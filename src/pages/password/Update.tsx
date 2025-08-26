import Header from "@/components/Header"
import Input from "@/components/Input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"

const Update = () => {
    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState({
        newPassword: false,
        confirmPassword: false
    })

    const navigate = useNavigate()

    return (
        <div className="w-full text-base h-full min-h-[calc(100vh-32px)] relative">
            <Header title="Change Password" href="/setting" />
            <div className='flex flex-col items-center justify-center py-12 gap-4'>
                <Input
                    Icon={showPassword.newPassword ? EyeOff : Eye}
                    value={password.newPassword}
                    placeholder='New Password'
                    onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                    autoFocus
                    type={showPassword.newPassword ? "text" : "password"}
                    handleClick={() => setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })}
                />
                <Input
                    Icon={showPassword.confirmPassword ? EyeOff : Eye}
                    value={password.confirmPassword}
                    placeholder='Confirm Password'
                    onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
                    type={showPassword.confirmPassword ? "text" : "password"}
                    handleClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}
                />
            </div>
            <Button className="absolute bottom-0 w-full py-6" onClick={() => navigate("/setting")}>
                Save
            </Button>
        </div>
    )
}

export default Update