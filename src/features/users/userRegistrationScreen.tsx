import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alertDialog";
import { Button } from "@/components/ui/button";
import { DocumentInput } from "@/components/ui/documentInput";
import { Input } from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInYears, isValid } from "date-fns";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DateInput, Stack } from "rsuite";
import { z } from "zod";
import { registerUser } from "./usersService";

const documentRegex =
  /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/;

const userRegistrationSchema = z
  .object({
    name: z.string().min(1, "O nome é obrigatório"),
    lastname: z.string().min(1, "O sobrenome é obrigatório"),
    birthdate: z
      .date()
      .refine(
        (date) => isValid(date) && differenceInYears(new Date(), date) >= 18,
        {
          message: "Data de nascimento inválida ou usuário menor de 18 anos",
        }
      ),
    document: z
      .string()
      .min(1, "O documento é obrigatório")
      .refine((value) => documentRegex.test(value), {
        message: "O documento deve ser um CPF ou CNPJ válido",
      }),
    ddd: z.string().min(2, "DDD é obrigatório"),
    phone: z.string().min(8, "O telefone é obrigatório"),
    email: z.string().min(1, "O e-mail é obrigatório").email("E-mail inválido"),
    role: z.string().optional(),
    login: z.string().min(1, "O login é obrigatório"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  })
  .transform((data) => ({
    ...data,
    role: "mechanic",
    phone: Number(`${data.ddd}${data.phone}`),
  }));

export type UserRegistrationFormData = z.infer<typeof userRegistrationSchema>;

export default function UserRegistrationScreen() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegistrationFormData>({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: { birthdate: undefined },
  });

  const onSubmit = async (data: UserRegistrationFormData) => {
    try {
      await registerUser(data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <div className="max-h-screen flex flex-col bg-gray-100">
      <h2 className="pl-[66px] pt-12 pb-[50px] text-neutral-500 text-2xl font-medium">
        Cadastrar Usuário
      </h2>
      <div className="w-full px-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-5xl bg-white p-10 rounded-lg shadow-md mx-auto"
        >
          <div className="grid grid-cols-2 gap-10">
            <div>
              <Input {...register("name")} placeholder="Nome" />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Input {...register("lastname")} placeholder="Sobrenome" />
              {errors.lastname && (
                <p className="text-red-500 text-sm">
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 max-w-xs">
            <Stack spacing={10} direction="column" alignItems="flex-start">
              <Controller
                name="birthdate"
                control={control}
                render={({ field }) => (
                  <DateInput
                    value={field.value || null}
                    onChange={(date) => field.onChange(date)}
                    placeholder="Data de Nascimento"
                    className="flex h-10 w-full rounded-md border border-input bg-background py-2 px-4 text-sm"
                  />
                )}
              />
            </Stack>
            {errors.birthdate && (
              <p className="text-red-500 text-sm">{errors.birthdate.message}</p>
            )}
          </div>

          <div className="mt-4 max-w-xs">
            <Controller
              name="document"
              control={control}
              render={({ field }) => (
                <DocumentInput
                  {...field}
                  value={field.value}
                  onChange={(ev) => field.onChange(ev.target.value)}
                />
              )}
            />
            {errors.document && (
              <p className="text-sm text-red-500">{errors.document.message}</p>
            )}
          </div>

          <div className="mt-4 max-w-sm">
            <Input {...register("email")} type="email" placeholder="E-mail" />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mt-4 max-w-xs flex gap-2">
            <Input
              {...register("ddd")}
              placeholder="DDD"
              maxLength={3}
              className="w-20"
            />
            <Input
              {...register("phone")}
              placeholder="Telefone"
              type="tel"
              className="w-60"
              maxLength={9}
            />
          </div>
          {errors.ddd && (
            <p className="text-red-500 text-sm">{errors.ddd.message}</p>
          )}
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          <div className="mt-4 max-w-sm">
            <Input {...register("login")} placeholder="Login" />
            {errors.login && (
              <p className="text-red-500 text-sm">{errors.login.message}</p>
            )}
          </div>

          <div className="mt-4 max-w-sm">
            <Input
              {...register("password")}
              type="password"
              placeholder="Senha"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-center mt-6 gap-[50px] ">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/listaUsuarios")}
              className="rounded-xl bg-neutral-300 text-white"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="default" className="rounded-xl">
              Cadastrar
            </Button>
          </div>
        </form>
      </div>

      <AlertDialog open={isSuccess} onOpenChange={setIsSuccess}>
        <AlertDialogContent className="rounded-lg bg-white p-6 shadow-lg max-w-sm mx-auto">
          <AlertDialogHeader>
            <AlertDialogDescription className="text-gray-600 text-center text-xl">
              <div>Usuário cadastrado</div>
              <div className="text-lg">com sucesso!</div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center mt-4">
            <AlertDialogAction
              onClick={() => navigate("/listaUsuarios")}
              className="text-gray-100 hover:shadow-lg self-center px-4 py-2 rounded-md shadow-sm"
            >
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
