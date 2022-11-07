import { Category } from "@prisma/client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { trpc } from "../utils/trpc";
import { HiX } from "react-icons/hi";

interface CategoryModalProps {
	setCategoryModal: Dispatch<SetStateAction<boolean>>;
    setCategories: Dispatch<SetStateAction<Category[]>>;
}

const CategoryModal: FC<CategoryModalProps> = ({ setCategoryModal, setCategories }) => {
	const [name, setName] = useState<string>("");
	const { mutate: addCategory } = trpc.item.addCategory.useMutation({
        onSuccess: (category) => {
            setCategoryModal(false);
            setCategories((prev) => [...prev, category]);
        },
    });
	return (
		<div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
			<div className="w-full max-w-lg rounded-lg bg-white p-4">
				<label className="text-2xl font-bold text-gray-700">
					Add new Category
				</label>
				<input
					className="mt-4 w-full rounded-lg border border-gray-300 p-4"
					placeholder="Item name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<button className="mt-4 mr-4 rounded bg-violet-500 p-4 text-white transition duration-300 ease-in-out hover:bg-violet-800"
                    onClick={() => {
                        addCategory({ name });
                        setCategoryModal(false);
                    }}
                >
					Add
				</button>
				<button
					className="mt-4 rounded bg-gray-500 p-4 text-white transition duration-300 ease-in-out hover:bg-gray-800"
					onClick={() => setCategoryModal(false)}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default CategoryModal;
