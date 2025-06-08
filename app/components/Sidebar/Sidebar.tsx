import React, { useEffect, useRef, useState } from 'react';
import '@/app/ui/styles/sidebar/sidebar.scss';
import AlbumData from '@/app/interfaces/Album';
import { BiDirectionalPriorityQueue } from '@/app/utils/directionalQueue';

import { examplesJSON } from '@/database/examples';


interface CollectionSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    displayedAlbums?: AlbumData[];
}

const CollectionSidebar: React.FC<CollectionSidebarProps> = ({ isOpen, onClose }) => {
    const blockRef = useRef<HTMLDivElement>(null);
    const queueRef = useRef(new BiDirectionalPriorityQueue<AlbumData>());

    const [displayedAlbums, setDisplayedAlbums] = useState<AlbumData[]>([]);

    const handleClickOutside = (event: MouseEvent) => {
        if (blockRef.current && !blockRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const queue = queueRef.current;
        queue.clear();

        examplesJSON.forEach((album, index) => {
            queue.enqueue(album, index);
        });

        setDisplayedAlbums(queue.getAll());
    }, []);

    const moveAlbum = (album: AlbumData, position: 'top' | 'bottom') => {
        const queue = queueRef.current;
        queue.clear();
        const newQueue: AlbumData[] = [];

        if (position === 'top') {
            newQueue.push(album);
            newQueue.push(...displayedAlbums.filter(a => a.id !== album.id));
        } else {
            newQueue.push(...displayedAlbums.filter(a => a.id !== album.id));
            newQueue.push(album);
        }

        newQueue.forEach((a, i) => queue.enqueue(a, i));
        setDisplayedAlbums(queue.getAll());
    };

    return (
        <div className={`collection-sidebar ${isOpen ? 'open' : ''}`} ref={blockRef}>
            <div className="sidebar-content">
                <div className='last-listened-albums-title'>Last listened albums:</div>
                <div className="last-listened-albums-list">
                    {displayedAlbums.length > 0 ? (
                        displayedAlbums.map((album) => (
                            <div
                                key={album.id}
                                className="album-item"
                                onClick={() => moveAlbum(album, 'top')}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    moveAlbum(album, 'bottom');
                                }}
                            >

                                {/* <img src={album.frontCoverPath}/> */}
                                <span className="album-title">{album.title}</span> by
                                <span className="album-artist"> {album.artist.name}</span>
                            </div>
                        ))
                    ) : (
                        <li>No recent albums.</li>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CollectionSidebar;