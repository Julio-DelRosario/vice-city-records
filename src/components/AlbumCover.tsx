interface AlbumCoverProps {
  src: string | null;
  alt: string;
  size?: 'small' | 'medium' | 'large';
}

const AlbumCover = ({ src, alt, size = 'large' }: AlbumCoverProps) => {
  return (
    <div className={`album-cover album-cover--${size}`}>
      {src ? (
        <img src={src} alt={alt} />
      ) : (
        <div className="album-cover-placeholder">NO ARTWORK</div>
      )}
    </div>
  );
};

export default AlbumCover;
