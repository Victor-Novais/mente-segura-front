// 'use client';

// import { useState } from 'react';
// import { Input } from './ui/input';
// import { Button } from './ui/button';

// const COMMON_DEPARTMENTS = [
//     'RH',
//     'Financeiro',
//     'Comercial',
//     'TI',
//     'Marketing',
//     'Jurídico',
//     'Operações',
//     'Logística',
// ];

// type Props = {
//     selected: string[];
//     onChange: (departments: string[]) => void;
//     availableDepartments?: string[];
// };

// export function DepartmentSelector({ selected, onChange, availableDepartments }: Props) {
//     const [customDept, setCustomDept] = useState('');

//     const toggleDepartment = (name: string) => {
//         const already = selected.includes(name);
//         const updated = already
//             ? selected.filter((d) => d !== name)
//             : [...selected, name];
//         onChange(updated);
//     };

//     const addCustom = () => {
//         const trimmed = customDept.trim();
//         if (
//             trimmed &&
//             !selected.some((d) => d.toLowerCase() === trimmed.toLowerCase())
//         ) {
//             onChange([...selected, trimmed]);
//             setCustomDept('');
//         }
//     };

//     const departmentsToShow = availableDepartments || COMMON_DEPARTMENTS;

//     return (
//         <div className="space-y-6">
//             {/* Botões de departamentos dinâmicos ou padrão */}
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                 {departmentsToShow.map((dept) => (
//                     <Button
//                         key={dept}
//                         type="button"
//                         variant="outline"
//                         className={`w-full border-2 ${selected.includes(dept)
//                             ? 'bg-mental-purple text-white border-mental-purple hover:bg-mental-purple/90'
//                             : 'border-mental-purple text-mental-purple hover:bg-mental-purple/10'
//                             }`}
//                         onClick={() => toggleDepartment(dept)}
//                     >
//                         {dept}
//                     </Button>
//                 ))}
//             </div>

//             {/* Campo de adicionar manualmente — só se estiver no modo comum */}
//             {!availableDepartments && (
//                 <div className="flex gap-2 items-center">
//                     <Input
//                         placeholder="Adicionar outro departamento"
//                         value={customDept}
//                         onChange={(e) => setCustomDept(e.target.value)}
//                     />
//                     <Button
//                         type="button"
//                         onClick={addCustom}
//                         className="bg-mental-purple text-white hover:bg-mental-purple/90"
//                     >
//                         Adicionar
//                     </Button>
//                 </div>
//             )}

//             {selected.length > 0 && (
//                 <div className="text-sm text-gray-700">
//                     <span className="font-medium text-mental-purple">Selecionados:</span>{' '}
//                     {selected.join(', ')}
//                 </div>
//             )}
//         </div>
//     );
// }
"use client";

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

// Tipo de departamento utilizado no modo 'single'
export type Department = {
    id: string;
    name: string;
};

// Props suportam modo 'single' e 'multiple'
type Props =
    | {
        mode: 'single';
        selected: string | null;
        onChange: (id: string) => void;
        availableDepartments: Department[];
    }
    | {
        mode: 'multiple';
        selected: string[];
        onChange: (departments: string[]) => void;
        availableDepartments?: string[];
    };

export function DepartmentSelector(props: Props) {
    // MODO SINGLE: apenas botões em grid que retornam ID
    if (props.mode === 'single') {
        const { selected, onChange, availableDepartments } = props;
        return (
            <div className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableDepartments.map((d) => (
                        <Button
                            key={d.id}
                            type="button"
                            variant="outline"
                            className={`w-full border-2 ${selected === d.id
                                    ? 'bg-mental-purple text-white border-mental-purple hover:bg-mental-purple/90'
                                    : 'border-mental-purple text-mental-purple hover:bg-mental-purple/10'
                                }`}
                            onClick={() => onChange(d.id)}
                        >
                            {d.name}
                        </Button>
                    ))}
                </div>
                {selected && (
                    <div className="text-sm text-gray-700">
                        <span className="font-medium text-mental-purple">Selecionado:</span>{' '}
                        {availableDepartments.find((d) => d.id === selected)?.name}
                    </div>
                )}
            </div>
        );
    }

    // MODO MULTIPLE
    const { selected, onChange, availableDepartments } = props;
    const [customDept, setCustomDept] = useState('');
    const list = availableDepartments || COMMON_DEPARTMENTS;

    const toggle = (name: string) => {
        const updated = selected.includes(name)
            ? selected.filter((d) => d !== name)
            : [...selected, name];
        onChange(updated);
    };

    const addCustom = () => {
        const trimmed = customDept.trim();
        if (trimmed && !selected.some((d) => d.toLowerCase() === trimmed.toLowerCase())) {
            onChange([...selected, trimmed]);
            setCustomDept('');
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {list.map((dept) => (
                    <Button
                        key={dept}
                        type="button"
                        variant="outline"
                        className={`w-full border-2 ${selected.includes(dept)
                                ? 'bg-mental-purple text-white border-mental-purple hover:bg-mental-purple/90'
                                : 'border-mental-purple text-mental-purple hover:bg-mental-purple/10'
                            }`}
                        onClick={() => toggle(dept)}
                    >
                        {dept}
                    </Button>
                ))}
            </div>
            {!availableDepartments && (
                <div className="flex gap-2 items-center">
                    <Input
                        placeholder="Adicionar outro departamento"
                        value={customDept}
                        onChange={(e) => setCustomDept(e.target.value)}
                    />
                    <Button type="button" onClick={addCustom} className="bg-mental-purple text-white hover:bg-mental-purple/90">
                        Adicionar
                    </Button>
                </div>
            )}
            {selected.length > 0 && (
                <div className="text-sm text-gray-700">
                    <span className="font-medium text-mental-purple">Selecionados:</span>{' '}
                    {selected.join(', ')}
                </div>
            )}
        </div>
    );
}

// Constante de fallback para múltiplos
const COMMON_DEPARTMENTS = [
    'RH', 'Financeiro', 'Comercial', 'TI', 'Marketing', 'Jurídico', 'Operações', 'Logística',
];
