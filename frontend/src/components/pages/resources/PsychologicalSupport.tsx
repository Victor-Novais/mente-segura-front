'use client'

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { HeartPulse, ClipboardCheck, MessageCircle, Bell, Info, Calendar, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function PsychologicalSupport() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <Sidebar side="left" variant="sidebar" collapsible="icon">
            <SidebarHeader>
              <div className="flex items-center px-2">
                <div className="font-bold text-xl text-blue-500">Colaborador<span className="text-blue-700">Portal</span></div>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Principal</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <Link href="/patient-dashboard">
                        <SidebarMenuButton tooltip="Dashboard">
                          <HeartPulse className="h-5 w-5" />
                          <span>Meu Bem-Estar</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Avaliações">
                        <ClipboardCheck className="h-5 w-5" />
                        <span>Minhas Avaliações</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              
              <SidebarSeparator />
              
              <SidebarGroup>
                <SidebarGroupLabel>Recursos</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <Link href="/resources/support">
                        <SidebarMenuButton tooltip="Suporte Psicológico">
                          <MessageCircle className="h-5 w-5" />
                          <span>Suporte Psicológico</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <Link href="/resources/reporting">
                        <SidebarMenuButton tooltip="Canais de Denúncia">
                          <Bell className="h-5 w-5" />
                          <span>Canais de Denúncia</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <Link href="/resources/surveys">
                        <SidebarMenuButton tooltip="Pesquisas">
                          <FileText className="h-5 w-5" />
                          <span>Pesquisas</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <Link href="/resources/trainings">
                        <SidebarMenuButton tooltip="Treinamentos">
                          <Calendar className="h-5 w-5" />
                          <span>Treinamentos</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <Link href="/resources/policies">
                        <SidebarMenuButton tooltip="Políticas">
                          <Info className="h-5 w-5" />
                          <span>Políticas</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          
          <div className="flex-1 overflow-auto">
            <div className="p-4 md:p-6">
              <header className="flex items-center justify-between mb-6">
                <SidebarTrigger className="md:hidden" />
              </header>
              
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Suporte Psicológico</CardTitle>
                    <CardDescription>
                      Acesse nossos serviços de suporte psicológico disponíveis 24/7
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">Atendimento Online</h3>
                          <p className="text-sm text-gray-500">
                            Converse com nossos psicólogos em tempo real
                          </p>
                        </div>
                        <Button>Iniciar Chat</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">Agendamento de Consulta</h3>
                          <p className="text-sm text-gray-500">
                            Marque uma consulta presencial ou online
                          </p>
                        </div>
                        <Button>Agendar</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">Grupos de Apoio</h3>
                          <p className="text-sm text-gray-500">
                            Participe de grupos de apoio e compartilhe experiências
                          </p>
                        </div>
                        <Button>Ver Grupos</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
} 