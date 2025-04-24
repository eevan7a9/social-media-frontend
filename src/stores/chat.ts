import type { ChatRoom } from '@/shared/types/Chat';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

interface ChatRoomState extends ChatRoom {
  visible?: boolean
}

interface ChatState {
  rooms: ChatRoomState[];
}

export const useChatStore = defineStore('chat', () => {
  const state = reactive<ChatState>({
    rooms: []
  });

  const rooms = computed(() => state.rooms);
  const visibleRooms = computed(() => state.rooms.filter(room => room.visible));

  function setRooms(rooms: ChatRoom[]) {
    state.rooms = rooms;
  }

  function addRoom(room: ChatRoom) {
    if (!room || state.rooms.includes(room)) return;
    state.rooms.unshift(room);
  }

  function removeRoom(id: string) {
    state.rooms = state.rooms.filter((room) => room.id !== id);
  }

  function addRoomVisibility(id: string) {
    const foundRoom = state.rooms.find((room) => room.id === id);
    if(!foundRoom) return;
    foundRoom.visible = true;

  }

  function removeRoomVisibility(id: string) {
    const foundRoom = state.rooms.find((room) => room.id === id);
    if(!foundRoom) return;
    foundRoom.visible = false;
  }

  function clearRoomUnread(id:string) {
    const foundRoom = state.rooms.find(room => room.id === id);
    if(!foundRoom) return;
    foundRoom.unreads = 0
  }

  return {
    rooms,
    visibleRooms,
    setRooms,
    addRoom,
    removeRoom,
    addRoomVisibility,
    removeRoomVisibility,
    clearRoomUnread
  };
});
