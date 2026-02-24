import { type KeyboardEvent } from 'react';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { FaArrowUp } from 'react-icons/fa';

export type formData = {
   prompt: string;
};
type Props = {
   onSubmit: (data: formData) => void;
};

const ChatInput = ({ onSubmit }: Props) => {
   const { register, handleSubmit, reset, formState } = useForm<formData>();

   const submit = handleSubmit((data) => {
      reset({ prompt: '' });
      onSubmit(data);
   });

   const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         submit();
      }
   };

   return (
      <div>
         <form
            className="flex flex-col gap-2 items-end border-2 rounded-3xl p-4"
            onSubmit={submit}
            onKeyDown={onKeyDown}
         >
            <textarea
               autoFocus
               {...register('prompt', {
                  required: true,
                  validate: (data) => data.trim().length > 0,
               })}
               className="w-full border-0 focus:outline-0 resize-none"
               placeholder="Ask anything.."
               maxLength={1000}
            />
            <Button
               className="rounded-full w-10 h-10"
               disabled={!formState.isValid}
            >
               <FaArrowUp />
            </Button>
         </form>
      </div>
   );
};

export default ChatInput;
