"use client";
interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
  }
  
  export function AuthInput({ label, ...props }: AuthInputProps) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <input
          {...props}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
          required
        />
      </div>
    );
  }