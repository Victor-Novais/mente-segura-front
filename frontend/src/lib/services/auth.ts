import api from "../api";

export type LoginResponse = {
  access_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "gestor" | "profissional" | "colaborador";
    organizationId: string;
    departmentId?: string | null;
    isAdmin?: boolean;

    // ✅ Agora são obrigatórios para evitar erro de tipo
    onboarding: boolean;
    onboardingCompleted: boolean;
    profileCompleted: boolean;
  };
};

export type Role = "gestor" | "colaborador" | "profissional";

export type Nr1Status =
  | "nunca_ouvi_falar"
  | "sabemos_nao_fazemos"
  | "escolhendo_solucao"
  | "atendendo_exigencias";

export type RegisterWithCompanyData = {
  name: string;
  email: string;
  password: string;
  whatsapp: string;
  jobTitle: string;
  companySize: number;
  nr1Status: Nr1Status;
  role: Role;
};

export type RegisterCollaboratorData = {
  registration_code: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  role?: "profissional" | "colaborador";
  department_id?: string | null;
};

export type RegisterProfessionalData = {
  name: string;
  email: string;
  whatsapp: string;
  jobTitle: string;
  descricaoProfissional: string;
  nr1Status: Nr1Status;
  password: string;
};

export interface CompleteProfileData {
  name: string;
  cpf?: string;
  whatsapp?: string;
  jobTitle?: string;
  descricaoProfissional?: string;
  nr1Status?: Nr1Status;
}

// —————————————————————————————
// 1) REGISTROS
// —————————————————————————————

export async function registerWithCompany(
  data: RegisterWithCompanyData
): Promise<void> {
  await api.post("/auth/register", data);
}

export async function registerCollaborator(
  data: RegisterCollaboratorData
): Promise<void> {
  await api.post("/auth/register", {
    registration_code: data.registration_code,
    name: data.name,
    cpf: data.cpf,
    email: data.email,
    password: data.password,
    role: data.role ?? "colaborador",
    department_id: data.department_id ?? null,
  });
}

export async function registerProfessional(
  data: RegisterProfessionalData
): Promise<void> {
  await api.post("/auth/register", { ...data, role: "profissional" });
}

// —————————————————————————————
// 2) AUTENTICAÇÃO
// —————————————————————————————

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("organizationId", data.user.organizationId);
  return data;
}

export async function me(): Promise<LoginResponse["user"]> {
  const token = localStorage.getItem("token")!;
  const { data } = await api.get<{ user: LoginResponse["user"] }>("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.user;
}

export async function logout(): Promise<void> {
  const token = localStorage.getItem("token")!;
  await api.post("/auth/logout", null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  localStorage.removeItem("token");
  localStorage.removeItem("organizationId");
}

// —————————————————————————————
// 3) COMPLETE PROFILE
// —————————————————————————————

export async function completeProfile(
  data: CompleteProfileData
): Promise<void> {
  const token = localStorage.getItem("token")!;
  await api.post("/auth/complete-profile", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// —————————————————————————————
// 4) WIZARD DE ONBOARDING (localStorage)
// —————————————————————————————

export interface WizardProgress {
  currentStep: number;
  answers: Record<string, any>;
}

export async function getWizardProgress(): Promise<WizardProgress> {
  const rawStep = localStorage.getItem("wizardStep");
  const rawAns = localStorage.getItem("wizardAnswers");
  return {
    currentStep: rawStep ? parseInt(rawStep, 10) : 1,
    answers: rawAns ? JSON.parse(rawAns) : {},
  };
}

export async function saveWizardStep(
  step: number,
  answers: Record<string, any>
): Promise<void> {
  localStorage.setItem("wizardStep", String(step));
  localStorage.setItem("wizardAnswers", JSON.stringify(answers));
}

export async function finalizeOnboarding(): Promise<void> {
  const rawAns = localStorage.getItem("wizardAnswers") || "{}";
  const answers = JSON.parse(rawAns) as Record<string, any>;
  const orgId = localStorage.getItem("organizationId")!;
  const token = localStorage.getItem("token")!;

  if (Array.isArray(answers.departments) && answers.departments.length) {
    await Promise.all(
      answers.departments.map((name: string) =>
        api.post(
          "/departments",
          { name, organizationId: orgId },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      )
    );
  }

  await api.post("/auth/complete-profile", answers, {
    headers: { Authorization: `Bearer ${token}` },
  });

  localStorage.removeItem("wizardStep");
  localStorage.removeItem("wizardAnswers");
}
