import { MdStar } from 'react-icons/md';
import './styles.css'


interface CommentProps {
  avatar: string;
  name: string;
  rating: number;
  text: string;
}

function Comment({ avatar, name,  text }: CommentProps) {
  return (
    <div className="comment">
      <img src={avatar} alt={name} className="avatar" />
      <div className="comment-content">
        <span className="user-name">{name}</span>
        <div className="rating">
          <MdStar />
          <MdStar />
          <MdStar />
          <MdStar />
        </div>
        <p className="comment-text">{text}</p>
      </div>
    </div>
  );
}

export default Comment


export const comments: CommentProps[] = [
  {
    avatar: "https://i.pravatar.cc/50?img=1",
    name: "Carlos Silva",
    rating: 5,
    text: "Produto incrível, ótima qualidade e entrega rápida!",
  },
  {
    avatar: "https://i.pravatar.cc/50?img=2",
    name: "Ana Souza",
    rating: 4,
    text: "Gostei bastante, mas poderia melhorar o acabamento.",
  },
  {
    avatar: "https://i.pravatar.cc/50?img=3",
    name: "Lucas Pereira",
    rating: 3,
    text: "Bom custo-benefício, mas esperava mais.",
  },
];
