// Helper component to add smooth camera movements
// Since we have OrbitControls right now, this is a placeholder 
// for future direct camera manipulation if we want to zoom to nodes.
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

const CameraController = () => {
    const { camera } = useThree();

    useEffect(() => {
        // We could attach logic here if we want to lerp the camera position later.
        // For now, OrbitControls handles the main view.
    }, [camera]);

    return null;
};

export default CameraController;
