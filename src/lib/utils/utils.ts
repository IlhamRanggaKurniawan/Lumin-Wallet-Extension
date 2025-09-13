import { toast } from "sonner"

export const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text || "")

    toast.success("Copy success", {
        className: "bg-black"
    })
}