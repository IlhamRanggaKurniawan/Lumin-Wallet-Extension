import { Link } from '@tanstack/react-router'
import { ChevronRight, type LucideProps } from 'lucide-react'
import React, { type JSX } from 'react'

type settingProps = {
    title: string,
    href?: string,
    Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    Select?: () => JSX.Element
}

const Setting = ({ title, Icon, Select, href }: settingProps) => {
    return (
        <>
            {Select ? (
                <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-4">
                        <Icon />
                        <p>{title}</p>
                    </div>
                    <Select />
                </div>
            ) : (
                <>
                    {href ? (
                        <Link to={href} className="flex items-center justify-between p-2 rounded-md cursor-pointer duration-300 hover:bg-accent">
                            <div className="flex items-center gap-4">
                                <Icon />
                                <p>{title}</p>
                            </div>
                            <ChevronRight className='opacity-50 text-muted-foreground' />
                        </Link>
                    ) : (
                        <div className="flex items-center justify-between p-2 rounded-md cursor-pointer duration-300 hover:bg-accent">
                            <div className="flex items-center gap-4">
                                <Icon />
                                <p>{title}</p>
                            </div>
                            <ChevronRight className='opacity-50 text-muted-foreground' />
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default Setting