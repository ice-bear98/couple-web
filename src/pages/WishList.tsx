import { useEffect, useState } from "react";
import { realtimeDb } from "../firebase/FirebaseConfig";
import { onValue, push, ref, set } from "firebase/database";
import { Link } from "react-router-dom";

interface ITodo {
    id: string | null;
    description: string;
    completed: boolean;
}

export default function WishList() {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [Description, setDescription] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editDescription, setEditDescription] = useState("");

    useEffect(() => {
        const wishlistRef = ref(realtimeDb, "wishlist/");
        const unsubscribe = onValue(
            wishlistRef,
            (snapshot) => {
                const data = snapshot.val();
                const loadedTodos = [];
                for (const key in data) {
                    loadedTodos.push({
                        id: key,
                        ...data[key],
                    });
                }
                setTodos(loadedTodos);
            },
            (error) => {
                console.error("Firebase read failed: ", error);
            }
        );
        return () => unsubscribe();
    }, []);

    const handleAddTodo = () => {
        const todoRef = push(ref(realtimeDb, "wishlist/"));
        const newTodo = {
            description: Description,
            completed: false,
        };
        set(todoRef, newTodo).then(() => {
            setDescription("");
        });
    };

    const handleEdit = (todo: ITodo) => {
        setEditingId(todo.id);
        setEditDescription(todo.description);
    };

    const handleSave = () => {
        const todoRef = ref(realtimeDb, `wishlist/${editingId}`);
        const updatedTodo = {
            description: editDescription,
            completed:
                todos.find((todo) => todo.id === editingId)?.completed || false,
        };
        set(todoRef, updatedTodo).then(() => {
            setEditingId(null);
            setEditDescription("");
        });
    };
    const handleDeleteTodo = (id: string) => {
        const todoRef = ref(realtimeDb, `wishlist/${id}`);
        set(todoRef, null).then(() => {
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        });
    };

    return (
        <div className="max-h-screen bg-stone-300 text-center p-4">
            <div className="bg-stone-100 min-h-screen mx-auto max-w-80 sm:max-w-lg md:max-w-xl lg:max-w-4xl p-4">
                <Link to="/main">메인으로 이동</Link>
                <h1 className="text-lg font-bold">Wish List</h1>
                <input
                    className="border-2 border-gray-300 p-2 m-2"
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Wish list"
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddTodo}
                >
                    추가하기
                </button>
                <ul>
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="bg-white my-2 p-2 rounded shadow flex justify-between items-center"
                        >
                            {editingId === todo.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editDescription}
                                        onChange={(e) =>
                                            setEditDescription(e.target.value)
                                        }
                                        className="border-2 border-gray-300 p-2 flex-grow"
                                    />
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1"
                                        onClick={handleSave}
                                    >
                                        저장
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span
                                        className={`${
                                            todo.completed ? "line-through" : ""
                                        } flex-grow`}
                                    >
                                        {todo.description}
                                    </span>
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded m-1"
                                        onClick={() => handleEdit(todo)}
                                    >
                                        수정
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded m-1"
                                        onClick={() =>
                                            handleDeleteTodo(todo.id!)
                                        }
                                    >
                                        삭제
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
