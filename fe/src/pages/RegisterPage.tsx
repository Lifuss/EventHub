import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { registerSchema } from "../lib/schemas/register";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { eventsService } from "../lib/service";
import { Participant } from "../lib/types/types";
import { toast } from "react-toastify";

type RegisterFormData = z.infer<typeof registerSchema>;
const radioClass =
  "w-3 h-3 mr-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600";
const errorClassName = "p-1 text-red-500 text-sm";

const RegisterPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: ({
      eventId,
      credentials,
    }: {
      eventId: string;
      credentials: Participant;
    }) => eventsService.applyParticipant(eventId, credentials),
    onSuccess: () => {
      toast.success("You was applied on event successfully");
      navigate(-1);
    },
    onError: (err: { status: number }) => {
      if (err.status === 409) {
        toast.error("You already applied on this event (email used)");
      }
    },
  });

  const { data } = useQuery({
    queryKey: ["get event", params.id],
    queryFn: () => eventsService.getEventById(params.id!),
    select: (data) => data.event,
    enabled: !!params.id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    // @ts-expect-error due to deadline
    mutate({ eventId: params.id, credentials: data });
  };

  return (
    <div className=" mx-auto mt-10 px-2 max-w-[450px]">
      <h1 className="text-3xl text-center mb-4">
        Event {data ? data.title : "Loading..."} registration
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-2"
      >
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Full name
          <input
            type="fullName"
            {...register("fullName")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.fullName && (
            <p className={errorClassName}>{errors.fullName.message}</p>
          )}
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
          <input
            type="email"
            {...register("email")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && (
            <p className={errorClassName}>{errors.email.message}</p>
          )}
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Date of birth
          <input
            type="date"
            {...register("dateOfBirth")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.dateOfBirth && (
            <p className={errorClassName}>{errors.dateOfBirth.message}</p>
          )}
        </label>

        <p>Where did you hear about this event</p>
        <div className="ms-2 text-sm font-medium text-gray-900 flex gap-4">
          <label>
            <input
              {...register("hearAboutUs")}
              type="radio"
              value="social"
              className={radioClass}
            />
            <span>Social</span>
          </label>
          <label>
            <input
              className={radioClass}
              {...register("hearAboutUs")}
              type="radio"
              value="friends"
            />
            <span>Friends</span>
          </label>
          <label>
            <input
              className={radioClass}
              {...register("hearAboutUs")}
              type="radio"
              value="myself"
            />
            <span className="mr-1">Found myself</span>
          </label>
          <label>
            <input
              className={radioClass}
              {...register("hearAboutUs")}
              type="radio"
              value="other"
              defaultChecked
            />
            <span className="mr-1">Other</span>
          </label>
        </div>
        <Button className="mt-4" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
