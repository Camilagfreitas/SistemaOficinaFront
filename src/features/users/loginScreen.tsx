import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { login } from "./usersService";

const loginSchema = z.object({
  email: z.string().min(1, "O nome de usuário é obrigatório"),
  password: z.string().min(1, "A senha é obrigatória"),
});

type FormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const loginSuccess = await login(data);
    if (loginSuccess) {
      localStorage.setItem("authToken", loginSuccess.token);
      localStorage.setItem("user", loginSuccess.name);
      navigate("/home");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-neutral-500 text-3xl text-center">Login</h2>
        <div className="mb-4 pt-8">
          <Input {...register("email")} placeholder="Usuário" />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div className="mb-6">
          <Input
            {...register("password")}
            type="password"
            placeholder="Senha"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <div className="mt-4">
          <Button type="submit" variant="default" className="w-full">
            Entrar
          </Button>
        </div>
      </form>
    </div>
  );
}
