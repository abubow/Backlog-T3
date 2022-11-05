import { ListItem } from "@prisma/client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { trpc } from "../utils/trpc";
import { HiX } from "react-icons/hi";

interface ItemModalProps {
	setShowModal: Dispatch<SetStateAction<boolean>>;
    setItems: Dispatch<SetStateAction<ListItem[]>>;
}

const ItemModal: FC<ItemModalProps> = ({ setShowModal, setItems }) => {
	const [name, setName] = useState<string>("");

	const { mutate: addItem } = trpc.item.addItem.useMutation({
		onSuccess: (item) => {
            setItems((prev) => [...prev, item]);
			console.log("successfuly added item", item);
		},
	});
	return (
		<div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
			<div className="w-full max-w-lg rounded-lg bg-white p-4">
				<label className="text-2xl font-bold text-gray-700">
					Add new item
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
                        addItem({ name });
                        setShowModal(false);
                    }}
                >
					Add
				</button>
				<button
					className="mt-4 rounded bg-gray-500 p-4 text-white transition duration-300 ease-in-out hover:bg-gray-800"
					onClick={() => setShowModal(false)}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default ItemModal;
