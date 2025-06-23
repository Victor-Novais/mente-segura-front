// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Eye, EyeOff, Loader2, Mail, Lock, User, Building } from "lucide-react";
// import Link from "next/link";
// import { registerUser } from "@/lib/services/auth";
// import { toast } from "sonner";

// export default function SignUpPage() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     company: "",
//     companyCnpj: "",
//     password: "",
//     confirmPassword: "",

//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const toastId = toast.loading('Criando sua conta...');
//     setIsLoading(true);

//     if (formData.password !== formData.confirmPassword) {
//       toast.error("As senhas não coincidem.", { id: toastId });
//       setIsLoading(false);
//       return;
//     }

//     try {
//       await registerUser({
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         companyName: formData.company,
//         companyCnpj: formData.companyCnpj,
//       });

//       toast.success("Conta criada com sucesso!", { id: toastId });
//       router.push("/dashboard");
//     } catch (error: any) {
//       console.error("Erro ao fazer cadastro:", error);
//       toast.error(
//         error.response?.data?.message || "Erro ao criar conta. Tente novamente.",
//         { id: toastId }
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mental-purple/10 to-mental-purple/5 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-bold">Criar Conta</h2>
//           <p className="text-gray-500 mt-2">
//             Preencha os dados abaixo para criar sua conta
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="name">Nome Completo</Label>
//             <div className="relative">
//               <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 id="name"
//                 type="text"
//                 placeholder="Seu nome completo"
//                 disabled={isLoading}
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className="pl-9"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="seu@email.com"
//                 disabled={isLoading}
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 className="pl-9"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="company">Empresa</Label>
//             <div className="relative">
//               <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 id="company"
//                 type="text"
//                 placeholder="Nome da sua empresa"
//                 disabled={isLoading}
//                 value={formData.company}
//                 onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//                 className="pl-9"
//               />
//             </div>
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="companyCnpj">CNPJ da Empresa</Label>
//             <div className="relative">
//               <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 id="companyCnpj"
//                 type="text"
//                 placeholder="00.000.000/0001-00"
//                 disabled={isLoading}
//                 value={formData.companyCnpj}
//                 onChange={(e) =>
//                   setFormData({ ...formData, companyCnpj: e.target.value })
//                 }
//                 className="pl-9"
//               />
//             </div>
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="password">Senha</Label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="••••••••"
//                 disabled={isLoading}
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 className="pl-9"
//               />
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 className="absolute right-2 top-1/2 -translate-y-1/2"
//                 onClick={() => setShowPassword(!showPassword)}
//                 disabled={isLoading}
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-4 w-4" />
//                 ) : (
//                   <Eye className="h-4 w-4" />
//                 )}
//               </Button>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="confirmPassword">Confirmar Senha</Label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 id="confirmPassword"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="••••••••"
//                 disabled={isLoading}
//                 value={formData.confirmPassword}
//                 onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//                 className="pl-9"
//               />
//             </div>
//           </div>

//           <Button
//             type="submit"
//             className="w-full bg-mental-purple hover:bg-mental-purple-dark"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Criando conta...
//               </>
//             ) : (
//               "Criar Conta"
//             )}
//           </Button>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-500">
//           Já tem uma conta?{" "}
//           <Link href="/sign-in" className="text-mental-purple hover:underline">
//             Faça login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
