<!-- src/routes/+page.svelte -->
<script lang="ts">
    export let data: {
      tournament: { id: number; name: string };
      rounds: { id: number; name: string }[];
    };
  </script>
  
  <div class="p-4">
    <!-- Tournament Title -->
    <h1 class="text-3xl font-bold mb-6">
      {data.tournament.name}
    </h1>
  
    <!-- Rounds List -->
    <ul class="space-y-2">
      {#each data.rounds as round}
        <li>
          <a
            href={`/rounds/${round.id}`}
            class="block p-4 bg-white rounded shadow hover:bg-gray-50"
          >
            {round.name}
          </a>
        </li>
      {/each}
    </ul>
  </div>
  